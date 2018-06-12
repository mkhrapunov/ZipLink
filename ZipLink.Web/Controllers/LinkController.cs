using Microsoft.AspNetCore.Mvc;
using ZipLink.Service;

namespace ZipLink.Web.Controllers
{
    
    public class LinkController : Controller
    {
        private readonly ILinkService linkService;
        public LinkController(ILinkService linkService)
        {
            this.linkService = linkService;
        }

        // Get l/{id}
        [HttpGet]
        [Route("l/{id}")]
        public IActionResult Get(string id)
        {
            var fullUrl = linkService.GetFullUrl(id);

            if (string.IsNullOrEmpty(fullUrl)) return BadRequest();

            return Redirect(fullUrl);
        }

        // Get l/info/all
        [HttpGet]
        [Route("l/info/count")]
        public dynamic Info()
        {
            return new {
                LinksCount = linkService.GetAllLinksCount()
            };
        }
    }
}
