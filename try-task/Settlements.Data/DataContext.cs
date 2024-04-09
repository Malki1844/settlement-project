using Microsoft.EntityFrameworkCore;
using Settlements.Core;
using System.Diagnostics;

namespace Settlements.Data
{

    public class DataContext: DbContext
    {
        public DbSet<Settlement> settlements { get; set; }

        //public DataContext()
        //{
        //    settlements = new List<Settlement>();
        //    settlements.Add(new Settlement { Id=1, Name="tal aviv" });

        //}



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=SettlementDb");
            optionsBuilder.LogTo(massage => Debug.WriteLine(massage));
        }

    }
}
