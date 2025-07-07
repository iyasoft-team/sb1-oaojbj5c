using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;
using QuranModels;

namespace QuranApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TajweedAnnotationsController : ControllerBase
    {
        private readonly QuranDbCtx _context;

        public TajweedAnnotationsController(QuranDbCtx context)
        {
            _context = context;
        }


    
      
    }
}
