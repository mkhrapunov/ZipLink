using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using ZipLink.Repo;
using ZipLink.Service;

namespace ZipLink.Services
{
    public class IdentityUserService : IIdentityUserService
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext applicationDbContext;

        public IdentityUserService(IHttpContextAccessor httpContextAccessor, ApplicationDbContext applicationDbContext)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.applicationDbContext = applicationDbContext;
        }

        public IdentityUser GetCurrentIdentity()
        {
            var userId = httpContextAccessor.HttpContext.User.Claims.Single(c => c.Type == "id").Value;
            return applicationDbContext.Users.Single(u => u.Id == userId);
        }

        public bool IsUserExist(string userId)
        {
            return applicationDbContext.Users.Any(u => u.Id == userId);
        }
    }
}
