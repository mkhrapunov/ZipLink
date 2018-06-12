using System;
using System.Collections.Generic;
using System.Text;
using ZipLink.Data;
using ZipLink.Repo;
using System.Linq;

namespace ZipLink.Service
{
    public class LinkService : ILinkService
    {
        private IRepository<Link> linkRepository;
        private IIdentityUserService identityUserService;

        public LinkService(IRepository<Link> linkRepository, IIdentityUserService identityUserService)
        {
            this.linkRepository = linkRepository;
            this.identityUserService = identityUserService;
        }

        public IEnumerable<Link> GetLinks()
        {
            var userId = identityUserService.GetCurrentIdentity().Id;
            return linkRepository.GetAll().Where(l => l.IdentityId == userId);
        }

        public Link InsertLink(Link link)
        {
            if (identityUserService.GetCurrentIdentity() == null)
            {
                throw new Exception("User not exist");
            }
            if (this.GetLinks().Any(t => t.FullUrl == link.FullUrl))
            {
                throw new Exception($"Already added {link.FullUrl} for this user");
            }
            Uri uriResult;
            bool result = Uri.TryCreate(link.FullUrl, UriKind.Absolute, out uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            if (!result)
            {
                throw new Exception("Wrong Url");
            }
            link.IdentityId = identityUserService.GetCurrentIdentity().Id;
            return linkRepository.Insert(link);
        }

        public string GetFullUrl(string reduction)
        {
            var link = linkRepository.GetAll().FirstOrDefault(t => t.Reduction == reduction);

            if (link != null)
            {
                link.Transition++;
                linkRepository.Update(link);
                return link.FullUrl;
            }
            else
            {
                return String.Empty;
            }
        }

        public int GetAllLinksCount()
        {
            return linkRepository.GetAll().Count();
        }
    }
}
