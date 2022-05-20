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

        public async Task<string> AddProductAsync(Product product)
        {
            try
            {
                HttpClientHandler brandHandler = new HttpClientHandler();
                brandHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient brand = new HttpClient(brandHandler);
                HttpResponseMessage responseBrand = await brand.GetAsync($"https://host.docker.internal:779/Brand/{product.BrandId}");
                responseBrand.EnsureSuccessStatusCode();

                string responseBrandBody = await responseBrand.Content.ReadAsStringAsync();

                var BrandR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBrandBody);

                HttpClientHandler categoryHandler = new HttpClientHandler();
                categoryHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient category = new HttpClient(categoryHandler);
                HttpResponseMessage responseCategory = await category.GetAsync($"https://host.docker.internal:779/Category/{product.CategorysId}");
                responseCategory.EnsureSuccessStatusCode();

                string responseCategoryBody = await responseCategory.Content.ReadAsStringAsync();

                var CategoryR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseCategoryBody);

                if (CategoryR == null || BrandR == null)
                {
                    return "Error, brand or category not exist";
                }
                else
                {
                    await _repository.AddAsync(product);
                    return "Successfully added. ID: " + product.Id;
                }
            }
            catch (Exception e)
            {
                return "Exception caught. " + e;
            }

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
