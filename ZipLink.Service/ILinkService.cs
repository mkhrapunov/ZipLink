using System;
using System.Collections.Generic;
using System.Text;
using ZipLink.Data;

namespace ZipLink.Service
{
    public interface ILinkService
    {
        IEnumerable<Link> GetLinks();
        Link InsertLink(Link link);
        string GetFullUrl(string reduction);
        int GetAllLinksCount();
    }
}
