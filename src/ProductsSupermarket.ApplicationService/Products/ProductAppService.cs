using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Product;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Products
{
    public class ProductAppService : IProductAppService
    {
        private readonly IRepository<int, Product> _repository;

        public ProductAppService(IRepository<int, Product> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddProductAsync(Product product)
        {
            /*HttpClientHandler clientHandler = new HttpClientHandler();
            HttpClient brand = new HttpClient(clientHandler);
            HttpResponseMessage responseOrigin = await brand.GetAsync($"https://host.docker.internal:773/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);*/

            await _repository.AddAsync(product);
            return product.Id;
        }

        public async Task DeleteProductAsync(int productId)
        {
            await _repository.DeleteAsync(productId);
        }

        public async Task EditProductAsync(Product product)
        {
            await _repository.UpdateAsync(product);
        }

        public async Task<Product> GetProductAsync(int productId)
        {
            return await _repository.GetAsync(productId);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
