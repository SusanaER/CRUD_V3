using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess.Repositories
{
    public class CategoryRepository : Repository<int, Category>
    {
        public CategoryRepository(ProductsSupermarketContex context) : base(context)
        {

        }

        public override async Task<Category> AddAsync(Category entity)
        {
            await Context.Categories.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Category> UpdateAsync(Category entity)
        {
            var category = await Context.Categories.FindAsync(entity.Id);
            category.Id = entity.Id;
            category.Name = entity.Name;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Category> GetAsync(int id)
        {
            var category = await Context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            return category;
        }
    }
}
