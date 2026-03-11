using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ChronicDbContext : DbContext
    {
        public ChronicDbContext(DbContextOptions<ChronicDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Vital> Vitals { get; set; }
    }
}
