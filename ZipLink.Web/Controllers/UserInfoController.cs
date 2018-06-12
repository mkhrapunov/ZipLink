using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZipLink.Service;

namespace ZipLink.Web.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]/[action]")]
    public class UserInfoController : Controller
    {
        private readonly IIdentityUserService identityUserService;

        public UserInfoController(IIdentityUserService identityUserService)
        {
            this.identityUserService = identityUserService;
        }

        // GET api/userinfo/get
        [HttpGet]
        public dynamic Get()
        {
            var currentIdentity = identityUserService.GetCurrentIdentity();
            return new {
                currentIdentity.UserName
            };
        }
    }
}
