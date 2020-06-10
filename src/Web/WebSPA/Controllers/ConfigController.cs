namespace eShopOnSteroids.WebSPA.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Collections.Generic;

    [ApiController]
    [Route("[controller]")]
    public class ConfigController : ControllerBase
    {
        private readonly IOptionsSnapshot<AppSettings> _settings;

        public ConfigController(IOptionsSnapshot<AppSettings> settings)
        {
            _settings = settings;
        }

        [HttpGet]
        public AppSettings Get()
        {
            return _settings.Value;
        }
    }
}
