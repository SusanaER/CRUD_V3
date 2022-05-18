using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Categories;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Categories
{
    public class CategoryAppService : ICategoryAppService
    {
        private readonly IRepository<int, Category> _repository;

        public CategoryAppService(IRepository<int, Category> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddCategoryAsync(Category category)
        {
            await _repository.AddAsync(category);
            return category.Id;
        }

        public async Task DeleteCategoryAsync(int categoryId)
        {
            await _repository.DeleteAsync(categoryId);
        }

        public async Task EditCategoryAsync(Category category)
        {
            await _repository.UpdateAsync(category);
        }

        public async Task<Category> GetCategoryAsync(int categoryId)
        {
            return await _repository.GetAsync(categoryId);
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
