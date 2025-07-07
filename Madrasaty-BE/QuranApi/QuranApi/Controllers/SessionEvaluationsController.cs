using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionEvaluationsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public SessionEvaluationsController(SchoolDbCtx context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionEvaluation>>> GetAll()
        {
            return await _context.SessionEvaluations
                .Include(se => se.Session)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SessionEvaluation>> GetById(int id)
        {
            var evaluation = await _context.SessionEvaluations
                .Include(se => se.Session)
                .FirstOrDefaultAsync(se => se.Id == id);

            if (evaluation == null)
                return NotFound();

            return evaluation;
        }

        [HttpPost]
        public async Task<ActionResult<SessionEvaluation>> Create(SessionEvaluation evaluation)
        {
            _context.SessionEvaluations.Add(evaluation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = evaluation.Id }, evaluation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SessionEvaluation evaluation)
        {
            if (id != evaluation.Id)
                return BadRequest();

            _context.Entry(evaluation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.SessionEvaluations.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var evaluation = await _context.SessionEvaluations.FindAsync(id);
            if (evaluation == null)
                return NotFound();

            _context.SessionEvaluations.Remove(evaluation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
