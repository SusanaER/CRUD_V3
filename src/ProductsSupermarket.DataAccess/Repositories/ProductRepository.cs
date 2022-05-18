using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess.Repositories
{
    public class ProductRepository : Repository<int, Product>
    {
        public ProductRepository(ProductsSupermarketContex context) : base(context)
        {

        }

        public override async Task<Product> AddAsync(Product entity)
        {
            await Context.Products.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Product> UpdateAsync(Product entity)
        {
            var product = await Context.Products.FindAsync(entity.Id);
            product.Id = entity.Id;
            product.Name = entity.Name;
            product.Description = entity.Description;
            product.Image = entity.Image;
            product.Precio = entity.Precio;
            product.BrandId = entity.BrandId;
            product.CategorysId = product.CategorysId;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Product> GetAsync(int id)
        {
            var product = await Context.Products.FirstOrDefaultAsync(x => x.Id == id);
            return product;
        }
    }
}
