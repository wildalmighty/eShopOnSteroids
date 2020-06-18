namespace Web.Shopping.HttpAggregator.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return null;
        }
    }
}
