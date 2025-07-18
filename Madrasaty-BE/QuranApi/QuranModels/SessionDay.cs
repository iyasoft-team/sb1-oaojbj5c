using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class SessionDay
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public int SessionScheduleId { get; set; }
        public SessionSchedule? SessionSchedule { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public bool IsDefault { get; set; } = true;
        public string? Title { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public string? ModifiedBy { get; set; }
        public ICollection<Recitation>? Recitations { get; set; }
    }

    //public class SessionDto
    //{
    //    public int? Id { get; set; }
    //    public int StudentId { get; set; }
    //    public int TeacherId { get; set; }
    //    public string? Subject { get; set; }
    //    public DateTime StartDate { get; set; }
    //    public DateTime EndDate { get; set; }
    //    public int StartSurah { get; set; }
    //    public int StartAyah { get; set; }
    //    public Status Status { get; set; } 
    //    public StudentDto? Student { get; set; }
    //}
    public enum Status
    {
        PenDing,
        Finished,  
        Canceled
    }
}
