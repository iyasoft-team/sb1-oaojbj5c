using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class RecitationSegment
    {
        public int Id { get; set; }
        public int RecitationId { get; set; }
        public Recitation Recitation { get; set; }
        public int Order { get; set; }  

        public AyahRef ActualFrom { get; set; } = new();
        public AyahRef ActualTo { get; set; } = new();

        public RecitationMode Mode { get; set; } 


    }
    public class RecitationSegmentDto
    {
        public int Id { get; set; }
        public int RecitationId { get; set; }
        public int Order { get; set; }

        public AyahRef? ActualFrom { get; set; }
        public AyahRef? ActualTo { get; set; }

        public RecitationMode Mode { get; set; }
    }

}
