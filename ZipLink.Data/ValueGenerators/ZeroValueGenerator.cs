using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ZipLink.Data.ValueGenerators
{
    public class ZeroValueGenerator : ValueGenerator<int>
    {
        public override bool GeneratesTemporaryValues => false;

        public override int Next(EntityEntry entry)
        {
            return 0;
        }
    }
}
