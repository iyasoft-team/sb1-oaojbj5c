using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranModels
{
    public class TajweedError
    {
        public int Id { get; set; }
        public int EvaluationId { get; set; }
        public string RuleType { get; set; }
        public string ErrorDescription { get; set; }
        public int? CharIndex { get; set; }
        public SessionEvaluation Evaluation { get; set; }
    }
}
