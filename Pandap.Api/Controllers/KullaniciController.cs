using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pandap.api.DataModels;

namespace pandap.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KullaniciController : ControllerBase
    {
        PandapDbContext dc;

        public KullaniciController(PandapDbContext dc)
        {
            this.dc = dc;
        }


        [HttpGet]
        public IEnumerable<Kullanici> Get()
        {

            var result = dc.Kullanicilar.ToList();
            return result;

        }
    }
}
