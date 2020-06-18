using Identity.API.Data.Models;
using Identity.API.Models;
using System.Threading.Tasks;

namespace Identity.API.Services
{
    public interface IIdentityService
    {
        Task<Result<User>> Register(UserInputModel userInput);

        Task<Result<UserOutputModel>> Login(UserInputModel userInput);
    }
}
