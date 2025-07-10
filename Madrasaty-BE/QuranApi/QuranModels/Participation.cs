using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class Participation
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int SessionId { get; set; }
        public ParticipationStatus Status { get; set; }      
        public DateTime StartTime { get; set; }//the start hour scheduled for this student 
        public int DurationMinutes { get; set; }//how many minutes will the tasmii lasts 


        public Tasmii? Tasmii { get; set; }
        public Student? Student { get; set; }
        public SessionDay? Session { get; set; }

    }

    public class ParticipationTemplate
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public TimeSpan StartTime { get; set; }
        public int DurationMinutes { get; set; }
        public int SessionScheduleId { get; set; }


        public Student? Student { get; set; }
        public SessionSchedule? SessionSchedule { get; set; }
    }


    public enum ParticipationStatus
    {
        Pending,
        Done,
        Canceled
    }
}
