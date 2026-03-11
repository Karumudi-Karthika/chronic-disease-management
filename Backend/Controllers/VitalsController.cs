using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VitalsController : ControllerBase
    {
        private readonly ChronicDbContext _context;

        public VitalsController(ChronicDbContext context)
        {
            _context = context;
        }

        // GET: api/vitals
        [HttpGet]
        public async Task<IActionResult> GetVitals()
        {
            var vitals = await _context.Vitals.ToListAsync();
            return Ok(vitals);
        }

        // GET: api/vitals/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVital(int id)
        {
            var vital = await _context.Vitals.FindAsync(id);
            if (vital == null) return NotFound();
            return Ok(vital);
        }

        // POST: api/vitals
        [HttpPost]
        public async Task<IActionResult> AddVital(Vital vital)
        {
            _context.Vitals.Add(vital);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVital), new { id = vital.Id }, vital);
        }

        // PUT: api/vitals/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVital(int id, Vital vital)
        {
            var existing = await _context.Vitals.FindAsync(id);
            if (existing == null) return NotFound();

            existing.PatientId = vital.PatientId;
            existing.Temperature = vital.Temperature;
            existing.HeartRate = vital.HeartRate;
            existing.BloodPressureSystolic = vital.BloodPressureSystolic;
            existing.BloodPressureDiastolic = vital.BloodPressureDiastolic;
            existing.RecordedAt = vital.RecordedAt;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/vitals/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVital(int id)
        {
            var existing = await _context.Vitals.FindAsync(id);
            if (existing == null) return NotFound();

            _context.Vitals.Remove(existing);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
