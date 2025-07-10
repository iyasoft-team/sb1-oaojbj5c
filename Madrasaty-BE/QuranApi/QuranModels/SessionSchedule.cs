using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class SessionSchedule
    {
        public int Id { get; set; }

        public int TeacherId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool ToEndOfYear { get; set; }

        public Recurrence Recurrence { get; set; }

        public ICollection<ParticipationTemplate> DefaultParticipants { get; set; }

        public ICollection<SessionDay> SessionDays { get; set; }
    }
    public enum Recurrence
    {
        None,
        Daily,
        Weekly,
        Monthly,
    }
    public enum TimeSlotType
    {
        Fixed,
        Variable
    }
    public class TasmiiSessionDto
    {
        public int TeacherId { get; set; }
        public int classroomId { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSlotType TimeSlotType { get; set; }
        public int TimeslotValue { get; set; }
        public DateTime EndDate { get; set; }
        public Recurrence Reccurence { get; set; }
        public int[]? StudentIDs { get; set; }   
    }
}


