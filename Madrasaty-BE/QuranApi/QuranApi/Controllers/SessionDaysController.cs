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
            DateTime refDate = DateTime.Now.Date;

            var sessionDays = await _context.SessionDays
                .Where(t => t.TeacherId == id)
                .Where(ti => ti.Date.Date >= refDate)
                .Include(t => t.Recitations)
                 .ThenInclude(p => p.Student)
                .ToListAsync();

            var baseUrl = $"{Request.Scheme}://{Request.Host}/";

            // Sort session days by closest to now
            sessionDays = sessionDays
                .OrderBy(d => (d.Date - DateTime.Now).Duration()) // smallest time difference first
                .ToList();

            foreach (var day in sessionDays)
            {
                // Optional: sort recitations by startTime ascending
                day.Recitations = day.Recitations
                    .OrderBy(r => r.StartTime)
                    .ToList();

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
        [HttpGet("GetPreviousSessionDaysByTeacherID/{id}")]
        public async Task<ActionResult<IEnumerable<SessionDay>>> GetPreviousSessionDaysByTeacherID(int id)
        {
            DateTime refDate = DateTime.Now.Date;

            var sessionDays = await _context.SessionDays
                .Where(t => t.TeacherId == id)
                .Where(ti => ti.Date.Date < refDate)
                .Include(t => t.Recitations)
                 .ThenInclude(p => p.Student)
                .ToListAsync();

            var baseUrl = $"{Request.Scheme}://{Request.Host}/";

            // Sort session days by closest to now
            sessionDays = sessionDays
                .OrderBy(d => (d.Date - DateTime.Now).Duration()) // smallest time difference first
                .ToList();

            foreach (var day in sessionDays)
            {
                // Optional: sort recitations by startTime ascending
                day.Recitations = day.Recitations
                    .OrderBy(r => r.StartTime)
                    .ToList();

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
                .Include(t => t.Recitations)
                .ThenInclude(p => p.Student)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (sessionDay == null)
                return NotFound();

            // Inject base URL into student profile image URLs
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";

            foreach (var participant in sessionDay.Recitations)
            {
                var student = participant.Student;
                if (student != null &&
                    !string.IsNullOrEmpty(student.ProfileImageUrl) &&
                    !student.ProfileImageUrl.StartsWith("http"))
                {
                    student.ProfileImageUrl = baseUrl + student.ProfileImageUrl.TrimStart('/');
                }
            }

            return sessionDay;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSessionDay(int id, SessionDay sessionDay)
        {
            if (id != sessionDay.Id)
                return BadRequest();

            var existing = await _context.SessionDays
                .Include(sd => sd.Recitations)
                .FirstOrDefaultAsync(sd => sd.Id == id);

            if (existing == null)
                return NotFound();

            // Update scalar fields
            existing.Date = sessionDay.Date;
            existing.Title = sessionDay.Title;
            existing.ModifiedAt = DateTime.UtcNow;
            existing.ModifiedBy = sessionDay.ModifiedBy;

            // Track incoming IDs
            var incomingIds = sessionDay.Recitations?.Where(r => r.Id != 0).Select(r => r.Id).ToList() ?? new List<int>();

            // 1. Remove recitations that are no longer included
            var toRemove = existing.Recitations
                .Where(r => !incomingIds.Contains(r.Id))
                .ToList();

            _context.Recitations.RemoveRange(toRemove);

            // 2. Update existing ones
            foreach (var existingRec in existing.Recitations)
            {
                var updatedRec = sessionDay.Recitations?.FirstOrDefault(r => r.Id == existingRec.Id);
                if (updatedRec != null)
                {
                    existingRec.StartTime = updatedRec.StartTime;
                    existingRec.DurationMinutes = updatedRec.DurationMinutes;
                    existingRec.StudentId = updatedRec.StudentId;
                    existingRec.participationStatus = updatedRec.participationStatus;
                    existingRec.presenceStatus = updatedRec.presenceStatus;

                    // ... update other fields if needed
                }
            }

            // 3. Add new recitations
            var newRecs = sessionDay.Recitations?
                .Where(r => r.Id == 0)
                .ToList();

            if (newRecs?.Any() == true)
            {
                foreach (var rec in newRecs)
                {
                    rec.SessionId = existing.Id;
                }

                _context.Recitations.AddRange(newRecs);
            }

            await _context.SaveChangesAsync();

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

        //[HttpPut("UpdateParticipantsInExistingSessionDay/{id}")]
        //public async Task<IActionResult> AppendRecitationsToSessionDay(int id, [FromBody] List<AddRecitationMinimalDto> newParticipants)
        //{
        //    if (newParticipants == null || newParticipants.Count == 0)
        //        return BadRequest("At least one recitation must be provided.");

        //    var sessionDay = await _context.SessionDays
        //        .Include(sd => sd.Recitations)
        //        .FirstOrDefaultAsync(sd => sd.Id == id);

        //    if (sessionDay == null)
        //        return NotFound($"SessionDay with id {id} not found.");

        //    // Get the last end time from existing recitations
        //    DateTime lastEndTime = sessionDay.Recitations?
        //        .OrderByDescending(r => r.StartTime)
        //        .Select(r => r.StartTime.AddMinutes(r.DurationMinutes))
        //        .FirstOrDefault()
        //        ?? sessionDay.Date.Date.AddHours(8); // fallback: 08:00 AM

        //    foreach (var dto in newParticipants)
        //    {
        //        if (dto.DurationMinutes <= 0)
        //            return BadRequest("DurationMinutes must be > 0");

        //        var newRec = new Recitation
        //        {
        //            StudentId = dto.StudentId,
        //            StartSurah = 0,
        //            StartAyah = 0,
        //            ScheduledSurah = 0,
        //            ScheduledAyah = 0,
        //            StartTime = lastEndTime,
        //            DurationMinutes = dto.DurationMinutes,
        //            Status = ParticipationStatus.Pending, // or default
        //            SessionId = id
        //        };

        //        lastEndTime = newRec.StartTime.AddMinutes(newRec.DurationMinutes);

        //        _context.Recitations.Add(newRec);
        //    }

        //    await _context.SaveChangesAsync();

        //    return Ok("Recitations added successfully.");
        //}


        private bool SessionDayExists(int id)
        {
            return _context.SessionDays.Any(e => e.Id == id);
        }
    }
}
