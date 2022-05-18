using Microsoft.AspNetCore.Mvc;
using ProductsSupermarket.ApplicationService.Categories;
using ProductsSupermarket.Core.Categories;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductsSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryAppService _categoryAppService;

        public CategoryController(ICategoryAppService categoryAppService)
        {
            _categoryAppService = categoryAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Category> category = await _categoryAppService.GetCategoriesAsync();
            return new JsonResult(category);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var category = await _categoryAppService.GetCategoryAsync(id);
            return new JsonResult(category);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Category value)
        {
            var result = _categoryAppService.AddCategoryAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Category value)
        {
            var result = await _categoryAppService.GetCategoryAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _categoryAppService.EditCategoryAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _categoryAppService.GetCategoryAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _categoryAppService.DeleteCategoryAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}