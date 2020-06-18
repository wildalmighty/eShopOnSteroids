namespace Identity.API.Services
{
    using Identity.API.Data.Models;
    using Identity.API.Models;
    using Microsoft.AspNetCore.Identity;
    using System.Linq;
    using System.Threading.Tasks;

    public class IdentityService : IIdentityService
    {
        private const string InvalidErrorMessage = "Invalid credentials.";

        private readonly UserManager<User> userManager;
        private readonly ITokenGeneratorService jwtTokenGenerator;

        public IdentityService(UserManager<User> userManager, ITokenGeneratorService jwtTokenGenerator)
        {
            this.userManager = userManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<Result<UserOutputModel>> Login(UserInputModel userInput)
        {
            var user = await userManager.FindByEmailAsync(userInput.Email);
            if (user == null)
            {
                return InvalidErrorMessage;
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, userInput.Password);
            if (!passwordValid)
            {
                return InvalidErrorMessage;
            }

            var token = jwtTokenGenerator.GenerateToken(user);

            return new UserOutputModel(token);
        }

        public async Task<Result<User>> Register(UserInputModel userInput)
        {
            var user = new User
            {
                Email = userInput.Email,
                UserName = userInput.Email
            };

            var identityResult = await userManager.CreateAsync(user, userInput.Password);

            var errors = identityResult.Errors.Select(e => e.Description);

            return identityResult.Succeeded
                ? Result<User>.SuccessWith(user)
                : Result<User>.Failure(errors);
        }
    }
}
