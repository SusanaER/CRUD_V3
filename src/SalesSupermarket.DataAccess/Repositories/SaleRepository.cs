using Microsoft.EntityFrameworkCore;
using SalesSupermarket.Core.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesSupermarket.DataAccess.Repositories
{
    public class SaleRepository : Repository<int, Sale>
    {
        public SaleRepository(SalesSupermarketContext context) : base(context)
        {

        }

        public override async Task<Sale> AddAsync(Sale entity)
        {
            await Context.Sales.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Sale> UpdateAsync(Sale entity)
        {
            var sale = await Context.Sales.FindAsync(entity.Id);
            sale.Id = entity.Id;
            sale.ClientId = entity.ClientId;
            sale.SaleDate = entity.SaleDate;
            sale.ProducId = entity.ProducId;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Sale> GetAsync(int id)
        {
            var sale = await Context.Sales.FirstOrDefaultAsync(x => x.Id == id);
            return sale;
        }
    }
}
