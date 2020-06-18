namespace Identity.API.Services
{
    using Data.Models;

    public interface ITokenGeneratorService
    {
        string GenerateToken(User user);
    }
}
