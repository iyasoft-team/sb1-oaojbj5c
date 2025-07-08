using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class Session
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int TeacherId { get; set; }
        public string? Subject { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Status { get; set; } = "Planned";
        public Student Student { get; set; }
        public ICollection<SessionEvaluation> Evaluations { get; set; }
    }

    public class SessionDto
    {
        public int? Id { get; set; }
        public int StudentId { get; set; }
        public int TeacherId { get; set; }
        public string? Subject { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "Planned";
        public StudentDto? Student { get; set; }
    }
}
