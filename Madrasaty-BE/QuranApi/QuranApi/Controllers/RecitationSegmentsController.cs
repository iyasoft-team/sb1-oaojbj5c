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
    public class RecitationSegmentsController : ControllerBase
    {
        private readonly SchoolDbCtx _context;

        public RecitationSegmentsController(SchoolDbCtx context)
        {
            _context = context;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<RecitationSegmentDto>>> GetRecitationSegments()
        {
            var segments = await _context.RecitationSegment
           .AsNoTracking()
           .Select(s => new RecitationSegmentDto
           {
               Id = s.Id,
               RecitationId = s.RecitationId,
               Order = s.Order,
               ActualFrom = s.ActualFrom,   
               ActualTo = s.ActualTo,
               Mode = s.Mode
           })
           .ToListAsync();
            return Ok(segments);
        }

        [HttpGet("{id}")]
       
        public async Task<ActionResult<RecitationSegment>> GetRecitationSegment(int id)
        {
            var recitationSegment = await _context.RecitationSegment.FindAsync(id);

            if (recitationSegment == null)
            {
                return NotFound();
            }

            return recitationSegment;
        }
        
        [HttpGet("{sessionId}")]
        public async Task<ActionResult<IEnumerable<RecitationSegmentDto>>> GetSessionPreviousRecitationSegments(int sessionId)
        {
            var segments = await _context.RecitationSegment
           .Where(x=> x.RecitationId == sessionId)
           .AsNoTracking()
           .Select(s => new RecitationSegmentDto
           {
               Id = s.Id,
               RecitationId = s.RecitationId,
               Order = s.Order,
               ActualFrom = s.ActualFrom,
               ActualTo = s.ActualTo,
               Mode = s.Mode
           })
           .ToListAsync();
            return Ok(segments);
        }


        // PUT: api/RecitationSegments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecitationSegment(int id, RecitationSegment recitationSegment)
        {
            if (id != recitationSegment.Id)
            {
                return BadRequest();
            }

            _context.Entry(recitationSegment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecitationSegmentExists(id))
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

        // POST: api/RecitationSegments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("SaveRecitationSegment/{recitationId}")]
        public async Task<ActionResult<RecitationSegmentDto>> PostRecitationSegment(int recitationId , RecitationSegmentDto recitationSegment)
        {
            var recitation = await _context.Recitations.FirstOrDefaultAsync(r => r.Id == recitationId);

            if (recitation == null)
            {
                return NotFound($"Recitation {recitationId} not found.");
            }
            RecitationSegment newRecitationSegment = new RecitationSegment
            {
                ActualTo = recitationSegment.ActualTo,
                ActualFrom = recitationSegment.ActualFrom,
                RecitationId = recitationSegment.RecitationId,
                Mode = recitationSegment.Mode,
                Order = recitationSegment.Order,    

            };
            recitationSegment.RecitationId = recitationId;
            _context.RecitationSegment.Add(newRecitationSegment);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRecitationSegment",new { id = recitationSegment.Id },recitationSegment);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecitationSegment(int id)
        {
            var recitationSegment = await _context.RecitationSegment.FindAsync(id);
            if (recitationSegment == null)
            {
                return NotFound();
            }

            _context.RecitationSegment.Remove(recitationSegment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecitationSegmentExists(int id)
        {
            return _context.RecitationSegment.Any(e => e.Id == id);
        }
    }
}
