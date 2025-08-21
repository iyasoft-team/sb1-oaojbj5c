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
        public DbSet<ParticipationTemplate> ParticipationTemplate { get; set; }
        public DbSet<Recitation> Recitations { get; set; }
        public DbSet<RecitationSegment> RecitationSegment { get; set; }

        protected override void OnModelCreating(ModelBuilder b)
        {
            b.Entity<Recitation>(e =>
            {
                e.HasKey(x => x.Id);

                e.HasOne(x => x.Session)
                 .WithMany(s => s.Recitations)
                 .HasForeignKey(x => x.SessionId)
                 .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(x => x.Student)
                 .WithMany()
                 .HasForeignKey(x => x.StudentId)
                 .OnDelete(DeleteBehavior.Restrict);

                e.HasMany(x => x.RecitationSegments)
                 .WithOne(s => s.Recitation)
                 .HasForeignKey(s => s.RecitationId)
                 .OnDelete(DeleteBehavior.Cascade);

                e.OwnsOne(r => r.HomeworkFrom, hw =>
                {
                    hw.Property(p => p.Surah).HasColumnName("HomeworkFromSurah");
                    hw.Property(p => p.Ayah).HasColumnName("HomeworkFromAyah");
                });
                e.OwnsOne(r => r.HomeworkTo, hw =>
                {
                    hw.Property(p => p.Surah).HasColumnName("HomeworkToSurah");
                    hw.Property(p => p.Ayah).HasColumnName("HomeworkToAyah");
                });

            });

            b.Entity<RecitationSegment>(e =>
            {
                e.HasKey(x => x.Id);
                e.OwnsOne(x => x.ActualFrom, o =>
                {
                    o.Property(p => p.Surah).HasColumnName("FromSurah");
                    o.Property(p => p.Ayah).HasColumnName("FromAyah");
                });
                e.OwnsOne(x => x.ActualTo, o =>
                {
                    o.Property(p => p.Surah).HasColumnName("ToSurah");
                    o.Property(p => p.Ayah).HasColumnName("ToAyah");
                });

            });

        }
    }
}
