using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class TajweedEval
    {
        [Key]
        public int Id { get; set; }

        [Column("Surah")]
        public int Surah { get; set; }

        [Column("Ayah")]
        public int Ayah { get; set; }

        [Column("WordIndex")]
        public int WordIndex { get; set; }

        [Column("TStart")]
        public int Start { get; set; }

        [Column("TEnd")]
        public int End { get; set; }

        [Column("TRule")]
        [MaxLength(50)]
        public string Rule { get; set; }
        public int Evaluation { get; set; }
        public Session? Session { get; set; }
        public int SessionId { get; set; }
        public Student? Student { get; set; }
        public int StudentId { get; set; }
    }
}
