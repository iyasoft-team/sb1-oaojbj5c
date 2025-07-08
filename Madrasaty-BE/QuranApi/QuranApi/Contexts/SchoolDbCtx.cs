using Microsoft.EntityFrameworkCore;
using QuranModels;

namespace QuranApi.Contexts
{
    public class SchoolDbCtx : DbContext
    {
        public SchoolDbCtx(DbContextOptions<SchoolDbCtx> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<SessionEvaluation> SessionEvaluations { get; set; }
        public DbSet<TajweedError> TajweedErrors { get; set; }
        public DbSet<LastProgress> LastProgresses { get; set; }
        public DbSet<QuranModels.AyahEval> AyahEval { get; set; } = default!;
    }
}
