using Microsoft.AspNetCore.Mvc;
using ProductsSupermarket.ApplicationService.Inventories;
using ProductsSupermarket.Core.Inventory;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductsSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : Controller
    {
        private readonly IInventoryAppService _inventoryAppService;

        public InventoryController(IInventoryAppService inventoryAppService)
        {
            _inventoryAppService = inventoryAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Inventory> inventory = await _inventoryAppService.GetInventoriesAsync();
            return new JsonResult(inventory);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var inventory = await _inventoryAppService.GetInventoryAsync(id);
            return new JsonResult(inventory);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Inventory value)
        {
            var result = _inventoryAppService.AddInventoryAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Inventory value)
        {
            var result = await _inventoryAppService.GetInventoryAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _inventoryAppService.EditInventoryAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _inventoryAppService.GetInventoryAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _inventoryAppService.DeleteInventoryAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}