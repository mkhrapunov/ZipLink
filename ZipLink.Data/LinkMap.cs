﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using ZipLink.Data.ValueGenerators;

namespace ZipLink.Data
{
    public class LinkMap
    {
        public LinkMap(EntityTypeBuilder<Link> entityBuilder)
        {
            entityBuilder
                .HasKey(t => t.Id);
            entityBuilder
                .Property(t => t.Reduction)
                .HasValueGenerator((p,e) => new ShortIdValueGenerator());
            entityBuilder
                .Property(t => t.FullUrl)
                .IsRequired();
            entityBuilder
                .Property(t => t.Transition)
                .HasValueGenerator((p, e) => new ZeroValueGenerator());
            entityBuilder
                .Property(t => t.CreateTime)
                .HasValueGenerator((p, e) => new DateTimeNowValueGenerator());
            entityBuilder
                .Property(t => t.IdentityId)
                .IsRequired();
            entityBuilder
                .HasOne<IdentityUser>();
        }
    }
}
