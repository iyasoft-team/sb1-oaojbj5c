using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class TajweedAnnotation
    {
        [Key]
        public int Id { get; set; }

        [Column("Surah")]
        public int Surah { get; set; }

        [Column("Ayah")]
        public int Ayah { get; set; }

        [Column("WordIndex")]
        public int WordIndex { get; set; }

        [Column("CStart")]
        public int Start { get; set; }

        [Column("CEnd")]
        public int End { get; set; }

        [Column("CRule")]
        [MaxLength(50)]
        public string Rule { get; set; }
    }
}
