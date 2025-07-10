using Microsoft.EntityFrameworkCore;
using QuranModels;

namespace QuranApi.Contexts
{
    public class SchoolDbCtx : DbContext
    {
        public SchoolDbCtx(DbContextOptions<SchoolDbCtx> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<SessionDay> SessionDays { get; set; }
        public DbSet<QuranModels.AyahEval> AyahEvals { get; set; } = default!;
        public DbSet<QuranModels.SessionSchedule> SessionSchedules { get; set; } = default!;
    }
}
