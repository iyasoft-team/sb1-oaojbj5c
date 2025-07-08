using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AyahEvalsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public AyahEvalsController(SchoolDbCtx context)
        {
            _context = context;
        }

        // GET: api/AyahEvals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AyahEval>>> GetAyahEval()
        {
            return await _context.AyahEval.ToListAsync();
        }

        // GET: api/AyahEvals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AyahEval>> GetAyahEval(int id)
        {
            var ayahEval = await _context.AyahEval.FindAsync(id);

            if (ayahEval == null)
            {
                return NotFound();
            }

            return ayahEval;
        }

        [HttpGet("last/students/{studentId}")]
        public async Task<ActionResult<AyahEval>> GetlastAyahEval(int studentId)
        {
            var lastEval = await _context.AyahEval
                .Where(e => e.StudentId == studentId)
                .OrderByDescending(e => e.Id) // or use Session.StartDate if available
                .FirstOrDefaultAsync();

                    if (lastEval == null)
                    {
                        return NotFound();
                    }

            return Ok(lastEval);
        }
        // PUT: api/AyahEvals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAyahEval(int id, AyahEval ayahEval)
        {
            if (id != ayahEval.Id)
            {
                return BadRequest();
            }

            _context.Entry(ayahEval).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AyahEvalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AyahEvals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AyahEval>> PostAyahEval(List<AyahEval> ayahEvals)
        {
            if (ayahEvals == null || !ayahEvals.Any())
            {
                return BadRequest("No evaluations provided.");
            }

            _context.AyahEval.AddRange(ayahEvals);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Created Ayah Evals",ayahEvals);
        }

        // DELETE: api/AyahEvals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAyahEval(int id)
        {
            var ayahEval = await _context.AyahEval.FindAsync(id);
            if (ayahEval == null)
            {
                return NotFound();
            }

            _context.AyahEval.Remove(ayahEval);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool AyahEvalExists(int id)
        {
            return _context.AyahEval.Any(e => e.Id == id);
        }
    }
}
