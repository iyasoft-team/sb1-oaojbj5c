using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public  class Tasmii
    {
        public int Id { get; set; }    
        public int StudentId { get; set; }
        public int ParticipationId { get; set; }
        public int StartSurah { get; set; }
        public int StartAyah { get; set; }
        public int ScheduledSurah { get; set; }
        public int ScheduledAyah { get; set; }

        public ICollection<AyahEval>? AyahEvals { get; set; }
        public ICollection<TajweedEval>? TajweedEvals { get; set; }
        public int Rating { get; set; }


        public Student? Student { get; set; }
        public Participation? Participation { get; set; }

    }
}
