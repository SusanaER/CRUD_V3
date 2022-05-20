using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RegularClientSupermarket.Core.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegularClientSupermarket.DataAccess
{
    public class RegularClientSupermarketContext : IdentityDbContext
    {
        public virtual DbSet<Client> Clients { get; set; }

        public RegularClientSupermarketContext(DbContextOptions<RegularClientSupermarketContext> options) : base(options)
        {

        }
    }
}