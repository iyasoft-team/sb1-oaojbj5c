using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace QuranModels
{
    public class Student
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ProfileImageUrl { get; set; }

        public ICollection<Session> Sessions { get; set; }
        public LastProgress? LastProgress { get; set; }
    }

    public class StudentDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
