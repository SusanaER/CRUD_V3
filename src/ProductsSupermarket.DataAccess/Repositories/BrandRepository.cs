using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Brand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess.Repositories
{
    public class BrandRepository : Repository<int, Brand>
    {
        public BrandRepository(ProductsSupermarketContex context) : base(context)
        {

        }

        public override async Task<Brand> AddAsync(Brand entity)
        {
            await Context.Brands.AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Brand> UpdateAsync(Brand entity)
        {
            var brand = await Context.Brands.FirstOrDefaultAsync(x => x.Id == entity.Id);
            if (brand == null)
            {
                return entity;
            }
            else
            {
                brand.Id = entity.Id;
                brand.Name = entity.Name;
                brand.WebSite = entity.WebSite;
                await Context.SaveChangesAsync();
                return entity;
            }
        }

        public override async Task<Brand> GetAsync(int id)
        {
            var brand = await Context.Brands.FirstOrDefaultAsync(x => x.Id == id);
            return brand;
        }
    }
}
