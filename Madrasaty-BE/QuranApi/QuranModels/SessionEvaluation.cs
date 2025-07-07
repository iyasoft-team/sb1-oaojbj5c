using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class SessionEvaluation
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public int SurahNumber { get; set; }
        public int AyahNumber { get; set; }
        public string RecitationStatus { get; set; } // Correct, Modest, Incorrect, etc.
        public int OverallRating { get; set; }

        public Session Session { get; set; }
        public ICollection<TajweedError> TajweedErrors { get; set; }
    }
}
