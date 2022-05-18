using Microsoft.AspNetCore.Mvc;
using SalesSupermarket.ApplicationService.Sales;
using SalesSupermarket.Core.Sale;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace SalesSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SaleController : Controller
    {
        private readonly ISaleAppService _saleAppService;

        public SaleController(ISaleAppService saleAppService)
        {
            _saleAppService = saleAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Sale> sale = await _saleAppService.GetSalesAsync();
            return new JsonResult(sale);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var sale = await _saleAppService.GetSaleAsync(id);
            return new JsonResult(sale);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Sale value)
        {
            var result = _saleAppService.AddSaleAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Sale value)
        {
            var result = await _saleAppService.GetSaleAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _saleAppService.EditSaleAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _saleAppService.GetSaleAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _saleAppService.DeleteSaleAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}