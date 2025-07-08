using Microsoft.AspNetCore.Http;
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
            var sessions  = await _context.Sessions.Include(s=>s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,  
                StudentId = s.StudentId
            }).ToListAsync();

            foreach (var item in sessions)
            {             
                 var stdnt  = await _context.Students.Select(x=> new StudentDto
                {
                    Id = x.Id,
                    FullName = x.FullName,
                    Email = x.Email,
                    BirthDate = x.BirthDate,
                    ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/" + x.ProfileImageUrl
                 }).FirstOrDefaultAsync(Student => Student.Id == item.StudentId);
                item.Student = stdnt;
            }
            return sessions;
        }

        [HttpGet("teacher/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetTeacherSessions(int id)
        {
            var sessions = await _context.Sessions.Where(s=>s.TeacherId == id).Include(s => s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,
                StudentId = s.StudentId,
                StartSurah = s.StartSurah,
                StartAyah = s.StartAyah
            }).ToListAsync();
            
            foreach (var item in sessions)
            {
                item.Student = await _context.Students.Select(x => new StudentDto
                {
                    Id = x.Id,
                    FullName = x.FullName,
                    Email = x.Email,
                    BirthDate = x.BirthDate,
                    ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/" + x.ProfileImageUrl
                }).FirstOrDefaultAsync(Student => Student.Id == item.StudentId);
            }
            return sessions;
        }
        
        [HttpGet("student/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetStudentSessions(int id)
        {
            var sessions =  await _context.Sessions.Where(s => s.StudentId == id).Include(s => s.Student).Select(s => new SessionDto
            {
                Id = s.Id,
                Subject = s.Subject,
                StartDate = s.StartDate,
                EndDate = s.EndDate,
                Status = s.Status,
                StudentId = s.StudentId
            }).ToListAsync();

            foreach (var item in sessions)
            {
                item.Student = await _context.Students.Select(x => new StudentDto
                {
                    Id = x.Id,
                    FullName = x.FullName,
                    Email = x.Email,
                    BirthDate = x.BirthDate,
                    ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/"+ x.ProfileImageUrl
                }).FirstOrDefaultAsync(Student => Student.Id == item.StudentId);
            }
            return sessions;
        }

        // GET: api/sessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SessionDto>> GetSession(int id)
        {
            var session = await _context.Sessions
                .Select(s => new SessionDto
                {
                    Id = s.Id,
                    Subject = s.Subject,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    Status = s.Status,
                    StudentId = s.StudentId,
                    StartSurah = s.StartSurah,
                    StartAyah = s.StartAyah
                })
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                return NotFound();

            session.Student = await _context.Students.Select(x => new StudentDto
            {
                Id = x.Id,
                FullName = x.FullName,
                Email = x.Email,
                BirthDate = x.BirthDate,
                ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/" + x.ProfileImageUrl
            }).FirstOrDefaultAsync(Student => Student.Id == session.StudentId);

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
                Status = sessionDto.Status,
                StartSurah = sessionDto.StartSurah,
                StartAyah  = sessionDto.StartAyah            
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


        // PUT: api/sessions/5
        [HttpGet("Complete/{id}")]
        public async Task<IActionResult> CompleteSession(int id)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                return NotFound();

            try
            {
                session.Status = "completed";

                _context.Entry(session).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
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
