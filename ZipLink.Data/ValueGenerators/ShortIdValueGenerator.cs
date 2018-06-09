using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using shortid;
using System;
using System.Collections.Generic;
using System.Text;

namespace ZipLink.Data.ValueGenerators
{
    public class ShortIdValueGenerator : ValueGenerator<string>
    {
        public override bool GeneratesTemporaryValues => false;

        public override string Next(EntityEntry entry)
        {
            return ShortId.Generate(true, false);
        }
    }
}
