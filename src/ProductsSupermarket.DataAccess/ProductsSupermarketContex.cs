using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Brand;
using ProductsSupermarket.Core.Categories;
using ProductsSupermarket.Core.Inventory;
using ProductsSupermarket.Core.Product;
using ProductsSupermarket.Core.Promotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess
{
    public class ProductsSupermarketContex : IdentityDbContext
    {
        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Brand> Brands { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Inventory> Inventories { get; set; }

        public virtual DbSet<Promotion> Promotions { get; set; }

        public ProductsSupermarketContex(DbContextOptions<ProductsSupermarketContex> options) : base(options)
        {

        }
    }
}