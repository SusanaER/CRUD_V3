using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Inventory;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Inventories
{
    public class InventoryAppService : IInventoryAppService
    {
        private readonly IRepository<int, Inventory> _repository;

        public InventoryAppService(IRepository<int, Inventory> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddInventoryAsync(Inventory inventory)
        {
            /*HttpClientHandler clientHandler = new HttpClientHandler();
            HttpClient brand = new HttpClient(clientHandler);
            HttpResponseMessage responseOrigin = await brand.GetAsync($"https://host.docker.internal:773/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);*/

            await _repository.AddAsync(inventory);
            return inventory.Id;
        }

        public async Task DeleteInventoryAsync(int inventoryId)
        {
            await _repository.DeleteAsync(inventoryId);
        }

        public async Task EditInventoryAsync(Inventory inventory)
        {
            await _repository.UpdateAsync(inventory);
        }

        public async Task<Inventory> GetInventoryAsync(int inventoryId)
        {
            return await _repository.GetAsync(inventoryId);
        }

        public async Task<List<Inventory>> GetInventoriesAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
