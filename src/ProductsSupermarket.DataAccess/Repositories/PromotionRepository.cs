using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Promotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess.Repositories
{
    public class PromotionRepository : Repository<int, Promotion>
    {
        public PromotionRepository(ProductsSupermarketContex context) : base(context)
        {

        }

        public override async Task<Promotion> AddAsync(Promotion entity)
        {
            await Context.Promotions.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Promotion> UpdateAsync(Promotion entity)
        {
            var promotion = await Context.Promotions.FindAsync(entity.Id);
            promotion.Id = entity.Id;
            promotion.ProductId = entity.ProductId;
            promotion.Description = entity.Description;
            promotion.Discounts = entity.Discounts;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Promotion> GetAsync(int id)
        {
            var promotion = await Context.Promotions.FirstOrDefaultAsync(x => x.Id == id);
            return promotion;
        }
    }
}
