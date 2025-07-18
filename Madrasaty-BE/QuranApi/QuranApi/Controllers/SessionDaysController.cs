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
    public class SessionDaysController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public SessionDaysController(SchoolDbCtx context)
        {
            _context = context;
        }

        [HttpGet("GetSessionDaysByTeacherID/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDay>>> GetSessionDaysByTeacherID(int id)
        {

            var sessionDays = await _context.SessionDays
                .Where(t => t.TeacherId == id)
                .Include(t => t.Recitations)
            .ThenInclude(p => p.Student)
        .ToListAsync();

            // Inject base URL into student profile image URLs
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";

            foreach (var day in sessionDays)
            {
                foreach (var participant in day.Recitations)
                {
                    var student = participant.Student;
                    if (student != null && !string.IsNullOrEmpty(student.ProfileImageUrl) && !student.ProfileImageUrl.StartsWith("http"))
                    {
                        student.ProfileImageUrl = baseUrl + student.ProfileImageUrl.TrimStart('/');
                    }
                }
            }

            return sessionDays;
        }
        [HttpGet("GetSessionDayByID/{id}")]
        public async Task<ActionResult<SessionDay>> GetSessionDayByID(int id)
        {
            var sessionDay = await _context.SessionDays
                .FirstOrDefaultAsync(t => t.Id == id);

            if (sessionDay == null)
                return NotFound();

            return sessionDay;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSessionDay(int id, SessionDay sessionDay)
        {
            if (id != sessionDay.Id)
            {
                return BadRequest();
            }

            _context.Entry(sessionDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionDayExists(id))
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

        [HttpPost]
        public async Task<ActionResult<SessionDay>> PostSessionDay(SessionDay sessionDay)
        {
            _context.SessionDays.Add(sessionDay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSessionDay", new { id = sessionDay.Id }, sessionDay);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSessionDay(int id)
        {
            var sessionDay = await _context.SessionDays.FindAsync(id);
            if (sessionDay == null)
            {
                return NotFound();
            }

            _context.SessionDays.Remove(sessionDay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SessionDayExists(int id)
        {
            return _context.SessionDays.Any(e => e.Id == id);
        }
    }
}
