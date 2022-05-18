using Microsoft.AspNetCore.Mvc;
using ProductsSupermarket.ApplicationService.Brands;
using ProductsSupermarket.Core.Brand;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductsSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandController : Controller
    {
        private readonly IBrandAppService _brandAppService;

        public BrandController(IBrandAppService brandAppService)
        {
            _brandAppService = brandAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Brand> brand = await _brandAppService.GetBrandsAsync();
            return new JsonResult(brand);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var brand = await _brandAppService.GetBrandAsync(id);
            return new JsonResult(brand);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Brand value)
        {
            var result = _brandAppService.AddBrandAsync(value);
            return new JsonResult (JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Brand value)
        {
            var result = await _brandAppService.GetBrandAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _brandAppService.EditBrandAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _brandAppService.GetBrandAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _brandAppService.DeleteBrandAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}
