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
    public class RecitationsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public RecitationsController(SchoolDbCtx context)
        {
            _context = context;
        }

        [HttpGet("GetRecitationsBySessionDayID/{id}")]
        public async Task<ActionResult<IEnumerable<Recitation>>> GetRecitations(int id)
        {
            var recitations = await _context.Recitations
                .Where(r => r.SessionId == id)
                .Include(r => r.Student)
                .ToListAsync();

            foreach (var recitation in recitations)
            {
                if (recitation.Student?.ProfileImageUrl != null)
                {
                    recitation.Student.ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/{recitation.Student.ProfileImageUrl}";
                }
            }

            return recitations;
        }

        [HttpGet("GetRecitationByID/{id}")]
        public async Task<ActionResult<Recitation>> GetRecitationByID(int id)
        {
            var recitation = await _context.Recitations.Include(x=>x.Student).FirstOrDefaultAsync(x => x.Id == id); 
            if(recitation==null)
            {
                return NotFound(); 
            }
            recitation.Student.ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/{recitation.Student.ProfileImageUrl}";
            return recitation;
        }

        [HttpGet("GetRecitationsByStudentID/{id}")]
        public async Task<ActionResult<IEnumerable<Recitation>>> GetStudentOldRecitations(int id)
        {
            var recitations = await _context.Recitations
                .Where(r => r.StudentId == id)
                .Include(r => r.Student)
                .ToListAsync();

            foreach (var recitation in recitations)
            {
                if (recitation.Student?.ProfileImageUrl != null)
                {
                    recitation.Student.ProfileImageUrl = $"{Request.Scheme}://{Request.Host}/{recitation.Student.ProfileImageUrl}";
                }
            }

            return recitations;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecitation(int id, Recitation recitation)
        {
            if (id != recitation.Id)
            {
                return BadRequest();
            }

            _context.Entry(recitation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecitationExists(id))
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
        public async Task<ActionResult<Recitation>> PostRecitation(Recitation recitation)
        {
            _context.Recitations.Add(recitation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecitation", new { id = recitation.Id }, recitation);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecitation(int id)
        {
            var recitation = await _context.Recitations.FindAsync(id);
            if (recitation == null)
            {
                return NotFound();
            }

            _context.Recitations.Remove(recitation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecitationExists(int id)
        {
            return _context.Recitations.Any(e => e.Id == id);
        }
    }
}
