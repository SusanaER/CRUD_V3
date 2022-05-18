using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.DataAccess.Repositories
{
    public class InventoriesRepository : Repository<int, Inventory>
    {
        public InventoriesRepository(ProductsSupermarketContex context) : base(context)
        {

        }

        public override async Task<Inventory> AddAsync(Inventory entity)
        {
            await Context.Inventories.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Inventory> UpdateAsync(Inventory entity)
        {
            var inventory = await Context.Inventories.FindAsync(entity.Id);
            inventory.Id = entity.Id;
            inventory.ProductId = entity.ProductId;
            inventory.Quantity = entity.Quantity;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Inventory> GetAsync(int id)
        {
            var inventory = await Context.Inventories.FirstOrDefaultAsync(x => x.Id == id);
            return inventory;
        }
    }
}
