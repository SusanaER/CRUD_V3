using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Promotion;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Promotions
{
    public class PromotionAppService : IPromotionAppService
    {
        private readonly IRepository<int, Promotion> _repository;

        public PromotionAppService(IRepository<int, Promotion> repository)
        {
            _repository = repository;
        }

        public async Task<string> AddPromotionAsync(Promotion promotion)
        {
            try
            {
                HttpClientHandler productHandler = new HttpClientHandler();
                productHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient product = new HttpClient(productHandler);
                HttpResponseMessage responseProduct = await product.GetAsync($"https://host.docker.internal:779/Product/{promotion.ProductId}");
                responseProduct.EnsureSuccessStatusCode();

                string responseProductBody = await responseProduct.Content.ReadAsStringAsync();

                var ProductR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseProductBody);

                if (ProductR == null)
                {
                    return "Error, product not exist";
                }
                else
                {
                    await _repository.AddAsync(promotion);
                    return "Successfully added. ID: " + promotion.Id;
                }
            }
            catch (Exception e)
            {
                return "Exception caught. " + e;
            }

        }

        public async Task DeletePromotionAsync(int promotionId)
        {
            await _repository.DeleteAsync(promotionId);
        }

        public async Task EditPromotionAsync(Promotion promotion)
        {
            await _repository.UpdateAsync(promotion);
        }

        public async Task<Promotion> GetPromotionAsync(int promotionId)
        {
            return await _repository.GetAsync(promotionId);
        }

        public async Task<List<Promotion>> GetPromotionsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
