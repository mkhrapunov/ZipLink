using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ZipLink.Service
{
    public interface IIdentityUserService
    {
        bool IsUserExist(string userId);
        IdentityUser GetCurrentIdentity();
    }
}
