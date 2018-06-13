using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using ZipLink.Data;
using ZipLink.Service;
using ZipLink.Web.ViewModels;
using System.Linq;

namespace ZipLink.Web.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]/[action]")]
    public class LinkManageController : Controller
    {
        private readonly ILinkService linkService;
        public LinkManageController(ILinkService linkService)
        {
            this.linkService = linkService;
        }

        // GET api/linkmanage/all
        [HttpGet]
        public IEnumerable<dynamic> All()
        {
            return linkService
                    .GetLinks()
                    .Select(l => new {
                        l.Reduction,
                        l.FullUrl,
                        l.Transition,
                        l.CreateTime
                    })
                    .ToList();
        }

        // POST api/linkmanage/add
        [HttpPost]
        public IActionResult Add([FromBody]AddLinkViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var link = linkService.InsertLink(new Link() { FullUrl = model.Url });
                return new OkObjectResult(link.Reduction); ;
            }
            catch (Exception ex)
            {
                var badRequest = new BadRequestObjectResult(ex);

                return badRequest;
            }

        }
    }
}
