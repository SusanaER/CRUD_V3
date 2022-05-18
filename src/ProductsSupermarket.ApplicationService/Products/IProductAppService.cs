using ProductsSupermarket.Core.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Products
{
    public interface IProductAppService
    {
        Task<List<Product>> GetProductsAsync();

        Task<int> AddProductAsync(Product product);

        Task DeleteProductAsync(int productId);

        Task<Product> GetProductAsync(int productId);

        Task EditProductAsync(Product product);
    }
}