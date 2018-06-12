using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ZipLink.Data
{
    public class Link : BaseEntity
    {
        public string Reduction { get; set; }
        public string FullUrl { get; set; }
        public Int32 Transition { get; set; }
        public string IdentityId { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
