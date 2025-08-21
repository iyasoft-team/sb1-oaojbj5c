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
        public DateTime StartTime { get; set; }
        public int DurationMinutes { get; set; }
        public PresenceStatus presenceStatus { get; set; }
        public ParticipationStatus participationStatus { get; set; }
        public int Rating { get; set; }
        public int SessionId { get; set; }
        public AyahRef? HomeworkFrom { get; set; }
        public AyahRef? HomeworkTo { get; set; } 


        //Student can read one to many surahs segments in one tasmii recitation ! 
        public ICollection<RecitationSegment> RecitationSegments { get; set; } = new List<RecitationSegment>();


        public ICollection<AyahEval>? AyahEvals { get; set; }
        public ICollection<TajweedEval>? TajweedEvals { get; set; }


        [JsonIgnore]
        public SessionDay? Session { get; set; }
        public Student? Student { get; set; }

    }
    public enum PresenceStatus
    {
        Present = 0 ,
        Late = 1 ,
        Absent = 3
    }
    public enum ParticipationStatus
    {
        InProgress = 0 ,
        Finished = 1,
        Waiting = 2 ,
        Canceled = 3
    }
    public class UpdateHomeworkDto
    {
        public int ScheduledSurah { get; set; }
        public int ScheduledAyah { get; set; }
    }
    public class AddRecitationMinimalDto
    {
        public int StudentId { get; set; }
        public int DurationMinutes { get; set; }
    }
}
