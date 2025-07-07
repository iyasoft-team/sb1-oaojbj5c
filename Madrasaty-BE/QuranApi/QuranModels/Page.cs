using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranModels
{
    public class Page

    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("page_number")]
        public int PageNumber { get; set; }

        [Column("chapter")]
        public int Chapter { get; set; }

        [Column("line_number")]
        public int LineNumber { get; set; }

        [Column("line_text")]
        public string LineText { get; set; }

        [Column("line_text_clean")]
        public string LineTextClean { get; set; }

        [Column("hizb")]
        public double Hizb { get; set; }

        [Column("surah_name")]
        public string SurahName { get; set; }

        [Column("surah_id")]
        public int SurahId { get; set; }
        public ICollection<Ayah> Ayahs { get; set; }
    }
}