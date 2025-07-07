using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class Ayah
    {
        [Key]
        public int Id { get; set; }

        [Column("page_id")]
        public int PageId { get; set; }

        [Column("ayah_number")]
        public int AyahNumber { get; set; }

        [Column("surah_id")]
        public int SurahId { get; set; }

        [Column("text")]
        public string Text { get; set; }

        [Column("text2")]
        public string Text2 { get; set; }

        [Column("is_end")]
        public bool IsEnd { get; set; }

        [Column("start_word_index")]
        public int StartWordIndex { get; set; }

        [Column("word_count")]
        public int WordCount { get; set; }
        
        [NotMapped]
        public ICollection<TajweedAnnotation>? Annotations { get; set; }
    }
}
