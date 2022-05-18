using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SalesSupermarket.Core.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesSupermarket.DataAccess
{
    public class SalesSupermarketContext : IdentityDbContext
    {
        public virtual DbSet<Sale> Sales { get; set; }

        public SalesSupermarketContext(DbContextOptions<SalesSupermarketContext> options) : base(options)
        {

        }
    }
}