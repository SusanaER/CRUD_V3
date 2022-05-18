using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Promotion;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<int> AddPromotionAsync(Promotion promotion)
        {
            /*HttpClientHandler clientHandler = new HttpClientHandler();
            HttpClient brand = new HttpClient(clientHandler);
            HttpResponseMessage responseOrigin = await brand.GetAsync($"https://host.docker.internal:773/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);*/

            await _repository.AddAsync(promotion);
            return promotion.Id;
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
