using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class AyahEval
    {
            public int? Id { get; set; }
            public int SessionId { get; set; }
            public int StudentId { get; set; }
            public int SurahNumber { get; set; }
            public int? AyahNumber { get; set; }
            public RecitationStatus RecitationStatus { get; set; } // Correct, Modest, Incorrect, etc.
            public Session? Session { get; set; }
            public Student? Student { get; set; }
    }


    public enum RecitationStatus
    {
        Correct,
        Modest,
        Unknown,
        Fail
    }
}
