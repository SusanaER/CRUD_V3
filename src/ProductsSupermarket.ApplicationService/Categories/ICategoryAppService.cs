using ProductsSupermarket.Core.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Categories
{
    public interface ICategoryAppService
    {
        Task<List<Category>> GetCategoriesAsync();

        Task<int> AddCategoryAsync(Category category);

        Task DeleteCategoryAsync(int categoryId);

        Task<Category> GetCategoryAsync(int categoryId);

        Task EditCategoryAsync(Category category);
    }
}