using Microsoft.AspNetCore.Mvc;
using ProductsSupermarket.ApplicationService.Products;
using ProductsSupermarket.Core.Product;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductsSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductAppService _productAppService;

        public ProductController(IProductAppService productAppService)
        {
            _productAppService = productAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Product> product = await _productAppService.GetProductsAsync();
            return new JsonResult(product);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var product = await _productAppService.GetProductAsync(id);
            return new JsonResult(product);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Product value)
        {
            var result = _productAppService.AddProductAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Product value)
        {
            var result = await _productAppService.GetProductAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _productAppService.EditProductAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _productAppService.GetProductAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _productAppService.DeleteProductAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}