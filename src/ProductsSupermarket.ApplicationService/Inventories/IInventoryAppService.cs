using ProductsSupermarket.Core.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Inventories
{
    public interface IInventoryAppService
    {
        Task<List<Inventory>> GetInventoriesAsync();

        Task<string> AddInventoryAsync(Inventory inventory);

        Task DeleteInventoryAsync(int inventoryId);

        Task<Inventory> GetInventoryAsync(int inventoryId);

        Task EditInventoryAsync(Inventory inventory);
    }
}

