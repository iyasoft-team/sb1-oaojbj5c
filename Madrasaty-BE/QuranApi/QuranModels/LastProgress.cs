using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class LastProgress
    {
        [Key]
        public int StudentId { get; set; }
        public int SurahNumber { get; set; }
        public int AyahNumber { get; set; }
        public int PageNumber { get; set; }
        public int WordIndex { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Student Student { get; set; }
    }
}
