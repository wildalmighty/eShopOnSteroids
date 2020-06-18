namespace Identity.API.Controllers
{
    using System.Threading.Tasks;
    using Identity.API.Models;
    using Identity.API.Services;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IIdentityService identityService;

        public AccountController(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult<UserOutputModel>> Register(UserInputModel input)
        {
            var result = await identityService.Register(input);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return await Login(input);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<UserOutputModel>> Login(UserInputModel input)
        {
            var result = await identityService.Login(input);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return new UserOutputModel(result.Data.Token);
        }
    }
}
