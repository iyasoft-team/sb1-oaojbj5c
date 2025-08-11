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
    public class SessionSchedulesController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public SessionSchedulesController(SchoolDbCtx context)
        {
            _context = context;
        }

        // GET: api/SessionSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionSchedule>>> GetSessionSchedules()
        {
            return await _context.SessionSchedules.ToListAsync();
        }

        // GET: api/SessionSchedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SessionSchedule>> GetSessionSchedule(int id)
        {
            var sessionSchedule = await _context.SessionSchedules.FindAsync(id);

            if (sessionSchedule == null)
            {
                return NotFound();
            }

            return sessionSchedule;
        }

        // PUT: api/SessionSchedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSessionSchedule(int id, SessionSchedule sessionSchedule)
        {
            if (id != sessionSchedule.Id)
            {
                return BadRequest();
            }

            _context.Entry(sessionSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionScheduleExists(id))
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
        public async Task<IActionResult> PostSessionSchedule(SessionScheduleDto sessionSchedule)
        {
            SessionSchedule newScheduledSession = new SessionSchedule
            {
                TeacherId = sessionSchedule.TeacherId,
                StartDate = sessionSchedule.StartDate,
                EndDate   = sessionSchedule.EndDate,
                Recurrence = sessionSchedule.Recurrence,
                ToEndOfYear = sessionSchedule.ToEndOfYear,  

            };
        
            _context.SessionSchedules.Add(newScheduledSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSessionSchedule", new { id = newScheduledSession.Id }, newScheduledSession);
        }
        [HttpPost("AddSessionSchedulewithStudents")]
        public async Task<IActionResult> AddSessionSchedulewithStudents(SessionScheduleDto sessionSchedule)
        {
            if (sessionSchedule.DefaultParticipants == null || !sessionSchedule.DefaultParticipants.Any())
                return BadRequest("No students provided.");

            var newScheduledSession = new SessionSchedule
            {
                TeacherId = sessionSchedule.TeacherId,
                StartDate = sessionSchedule.StartDate,
                Title = sessionSchedule.Title,
                EndDate = sessionSchedule.EndDate,
                Recurrence = sessionSchedule.Recurrence,
                ToEndOfYear = sessionSchedule.ToEndOfYear,
                DefaultParticipants = sessionSchedule.DefaultParticipants.Select(p => new ParticipationTemplate
                {
                    StudentId = p.StudentId,
                    StartTime = p.StartTime,
                    DurationMinutes = p.DurationMinutes
                }).ToList()
            };

            _context.SessionSchedules.Add(newScheduledSession);
            await _context.SaveChangesAsync(); // Get the ID for the session schedule

            // Step 1: Generate session days with participants
            var sessionDays = ShceduleUtils.GenerateRecurrentSessions(newScheduledSession);

            // Step 2: Save SessionDays
            // Step 3: Create Participation list for each SessionDay from DefaultParticipants
            var allParticipations = new List<Recitation>();

            foreach (var sessionDay in sessionDays)
            {
                var participants = sessionSchedule.DefaultParticipants.Select(template => new Recitation
                {
                    StudentId = template.StudentId,
                    SessionId = sessionDay.Id, // will be correctly set after SaveChanges
                    StartTime = sessionDay.Date.Date.Add(template.StartTime.TimeOfDay),
                    DurationMinutes = template.DurationMinutes,
                    Status = ParticipationStatus.Pending
                }).ToList();

                sessionDay.Recitations = participants;
                allParticipations.AddRange(participants);
            }

            // Step 4: Save sessionDays (EF Core will cascade save Participants if properly set up)
            _context.SessionDays.AddRange(sessionDays);
            await _context.SaveChangesAsync();

            return Ok(newScheduledSession);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSessionSchedule(int id)
        {
            var sessionSchedule = await _context.SessionSchedules.FindAsync(id);
            if (sessionSchedule == null)
            {
                return NotFound();
            }

            _context.SessionSchedules.Remove(sessionSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SessionScheduleExists(int id)
        {
            return _context.SessionSchedules.Any(e => e.Id == id);
        }
      
    }


    public static class ShceduleUtils
    {
        public static List<SessionDay> GenerateRecurrentSessions(SessionSchedule schedule)
        {
            if (schedule.DefaultParticipants == null || !schedule.DefaultParticipants.Any())
                throw new ArgumentException("DefaultParticipants must not be empty.");

            var sessionDays = new List<SessionDay>();

            DateTime current = schedule.StartDate.Date;

            // Determine session end date
            DateTime end = schedule.ToEndOfYear
                ? new DateTime(schedule.StartDate.Year, 12, 31) // Year ends in December
                : schedule.EndDate?.Date ?? schedule.StartDate.Date;

            // Calculate recurrence interval
            TimeSpan interval = schedule.Recurrence switch
            {
                Recurrence.Daily => TimeSpan.FromDays(1),
                Recurrence.Weekly => TimeSpan.FromDays(7),
                Recurrence.Monthly => TimeSpan.FromDays(30), // or consider AddMonths for precision
                _ => TimeSpan.Zero
            };

            if (interval == TimeSpan.Zero)
            {
                sessionDays.Add(CreateSessionDay(schedule, current));
                return sessionDays;
            }

            while (current <= end)
            {
                sessionDays.Add(CreateSessionDay(schedule, current));
                current = current.Add(interval);
            }

            return sessionDays;
        }

        private static SessionDay CreateSessionDay(SessionSchedule schedule, DateTime date)
        {
            return new SessionDay
            {
                TeacherId = schedule.TeacherId,
                SessionScheduleId = schedule.Id,
                Date = date,
                Title = schedule.Title,
                Status = Status.PenDing, // or your default enum value
                IsDefault = true,
                Recitations = schedule.DefaultParticipants?.Select(pt => new Recitation
                {
                    StudentId = pt.StudentId,
                    StartTime = date.Date.AddHours(pt.StartTime.Hour).AddMinutes(pt.StartTime.Minute),
                    DurationMinutes = pt.DurationMinutes,
                    Status = ParticipationStatus.Pending // or default
                }).ToList()
            };
        }
    }
   
}
