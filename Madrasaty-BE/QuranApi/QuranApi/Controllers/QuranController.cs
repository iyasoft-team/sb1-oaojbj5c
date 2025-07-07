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
    }
}
