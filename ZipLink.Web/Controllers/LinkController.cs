using Microsoft.AspNetCore.Mvc;
using ZipLink.Service;

namespace ZipLink.Web.Controllers
{
    [Route("l/{id}")]
    public class LinkController : Controller
    {
        private readonly ILinkService linkService;
        public LinkController(ILinkService linkService)
        {
            this.linkService = linkService;
        }

        // Get l/{id}
        [HttpGet]
        public IActionResult Get(string id)
        {
            var fullUrl = linkService.GetFullUrl(id);

            if (string.IsNullOrEmpty(fullUrl)) return BadRequest();

            return Redirect(fullUrl);
        }
    }
}
