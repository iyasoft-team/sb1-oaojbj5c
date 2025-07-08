using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuranController : ControllerBase
    {
        private readonly QuranDbCtx _context;

        public QuranController(QuranDbCtx context)
        {
            _context = context;
        }
        [HttpGet("page/{pageNumber}")]
        public async Task<ActionResult<IEnumerable<Page>>> GetPage(int pageNumber)
        {
            // Step 1: Load pages and ayahs
            var lines = await _context.Pages
                .Where(p => p.PageNumber == pageNumber)
                .Include(p => p.Ayahs)
                .OrderBy(p => p.LineNumber)
                .ToListAsync();

            foreach (var line in lines)
            {
                foreach (var ayah in line.Ayahs)
                {
                    ayah.Annotations = await _context.TajweedAnnotations.Where(a => a.Surah == ayah.SurahId && a.Ayah == ayah.AyahNumber).ToListAsync();
                }
            }

            return Ok(lines);
        }


        [HttpGet("pagebysurahayah/{surah}/{ayah}")]
        public async Task<ActionResult<IEnumerable<Page>>> GetPageBySurahAndAyah(int surah, int ayah)
        {
            var pageIds = await _context.Ayahs
                .Where(a => a.SurahId == surah && a.AyahNumber == ayah)
                .Select(a => a.PageId)
                .Distinct()
                .ToListAsync();


            var foundpage = await _context.Pages.FirstOrDefaultAsync(p => p.Id == pageIds.First());

            var pages = await _context.Pages
                .Where(p => p.PageNumber == foundpage.PageNumber)
                .Include(p => p.Ayahs)
                .OrderBy(p => p.LineNumber)
                .ToListAsync();


            foreach (var page in pages)
            {
                foreach (var a in page.Ayahs)
                {
                    a.Annotations = await _context.TajweedAnnotations
                        .Where(t => t.Surah == a.SurahId && t.Ayah == a.AyahNumber /*&& t.WordIndex<a.WordCount*/ )
                        .ToListAsync();
                }
            }

            return Ok(pages);
        }
    }
}
