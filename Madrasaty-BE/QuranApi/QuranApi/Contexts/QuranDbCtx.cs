using Microsoft.EntityFrameworkCore;
using QuranModels;
using System.Collections.Generic;

namespace QuranApi.Contexts
{
    public class QuranDbCtx : DbContext
    {
        public QuranDbCtx(DbContextOptions<QuranDbCtx> options) : base(options) { }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Ayah> Ayahs { get; set; }

        public DbSet<TajweedAnnotation> TajweedAnnotations { get; set; }

    }
}
