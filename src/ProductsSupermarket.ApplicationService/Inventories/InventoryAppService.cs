using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Inventory;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

        public async Task<string> AddInventoryAsync(Inventory inventory)
        {
            try
            {
                HttpClientHandler productHandler = new HttpClientHandler();
                productHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient product = new HttpClient(productHandler);
                HttpResponseMessage responseProduct = await product.GetAsync($"https://host.docker.internal:779/Product/{inventory.ProductId}");
                responseProduct.EnsureSuccessStatusCode();

                string responseProductBody = await responseProduct.Content.ReadAsStringAsync();

                var ProductR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseProductBody);

                if (ProductR == null)
                {
                    return "Error, product not exist";
                }
                else
                {
                    await _repository.AddAsync(inventory);
                    return "Successfully added. ID: " + inventory.Id;
                }
            }
            catch (Exception e)
            {
                return "Exception caught. " + e;
            }
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
