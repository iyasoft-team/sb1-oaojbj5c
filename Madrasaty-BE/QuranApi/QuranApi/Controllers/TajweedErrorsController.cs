using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TajweedErrorsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public TajweedErrorsController(SchoolDbCtx context)
        {
            _context = context;
        }

        // GET: api/tajweederrors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TajweedError>>> GetAll()
        {
            return await _context.TajweedErrors
                .Include(t => t.Evaluation)
                .ToListAsync();
        }

        // GET: api/tajweederrors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TajweedError>> GetById(int id)
        {
            var tajweedError = await _context.TajweedErrors
                .Include(t => t.Evaluation)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tajweedError == null)
                return NotFound();

            return tajweedError;
        }

        // POST: api/tajweederrors
        [HttpPost]
        public async Task<ActionResult<TajweedError>> Create(TajweedError error)
        {
            _context.TajweedErrors.Add(error);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = error.Id }, error);
        }

        // PUT: api/tajweederrors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TajweedError error)
        {
            if (id != error.Id)
                return BadRequest();

            _context.Entry(error).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TajweedErrors.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/tajweederrors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var error = await _context.TajweedErrors.FindAsync(id);
            if (error == null)
                return NotFound();

            _context.TajweedErrors.Remove(error);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
