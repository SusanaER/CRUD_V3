using ProductsSupermarket.Core.Promotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Promotions
{
    public interface IPromotionAppService
    {
        Task<List<Promotion>> GetPromotionsAsync();

        Task<string> AddPromotionAsync(Promotion promotion);

        Task DeletePromotionAsync(int promotionId);

        Task<Promotion> GetPromotionAsync(int promotionId);

        Task EditPromotionAsync(Promotion promotion);
    }
}

