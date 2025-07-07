using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public SessionsController(SchoolDbCtx context)
        {
            _context = context;
        }

        // GET: api/sessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetSessions()
        {
            return await _context.Sessions.Include(s=>s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,
                StudentName = s.Student.FullName
            }).ToListAsync();
        }

        [HttpGet("teacher/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetTeacherSessions(int id)
        {
            return await _context.Sessions.Where(s=>s.TeacherId == id).Include(s => s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,
                StudentName = s.Student.FullName
            }).ToListAsync();
        }
        
        [HttpGet("student/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetStudentSessions(int id)
        {
            return await _context.Sessions.Where(s => s.StudentId == id).Include(s => s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,
                StudentName = s.Student.FullName
            }).ToListAsync();
        }

        // GET: api/sessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            var session = await _context.Sessions
                .Include(s => s.Student)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                return NotFound();

            return session;
        }

        // POST: api/sessions
        [HttpPost]
        public async Task<ActionResult<Session>> PostSession(SessionDto sessionDto)
        {

            var session = new Session
            {
                StudentId = sessionDto.StudentId,
                TeacherId = sessionDto.TeacherId,
                Subject = sessionDto.Subject,
                StartDate = sessionDto.StartDate,
                EndDate = sessionDto.EndDate,
                Status = sessionDto.Status
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSession), new { id = session.Id }, session); 
        }

        // PUT: api/sessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, Session session)
        {
            if (id != session.Id)
                return BadRequest();

            _context.Entry(session).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Sessions.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/sessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.Sessions.FindAsync(id);
            if (session == null)
                return NotFound();

            _context.Sessions.Remove(session);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
