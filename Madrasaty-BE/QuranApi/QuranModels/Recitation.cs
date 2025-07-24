using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace QuranModels
{
    public  class Recitation
    {
        public int Id { get; set; }    
        public int StudentId { get; set; }
        public int StartSurah { get; set; }
        public int StartAyah { get; set; }
        public int ScheduledSurah { get; set; }
        public int ScheduledAyah { get; set; }

        public DateTime StartTime { get; set; }
        public int DurationMinutes { get; set; }
        public ParticipationStatus Status { get; set; }
        public int SessionId { get; set; }



        public ICollection<AyahEval>? AyahEvals { get; set; }
        public ICollection<TajweedEval>? TajweedEvals { get; set; }
        public int Rating { get; set; }


        [JsonIgnore]
        public SessionDay? Session { get; set; }
        public Student? Student { get; set; }

    }
    public class UpdateHomeworkDto
    {
        public int ScheduledSurah { get; set; }
        public int ScheduledAyah { get; set; }
    }
}
