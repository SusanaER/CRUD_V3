using Microsoft.AspNetCore.Mvc;
using ProductsSupermarket.ApplicationService.Promotions;
using ProductsSupermarket.Core.Promotion;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductsSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromotionController : Controller
    {
        private readonly IPromotionAppService _promotionAppService;

        public PromotionController(IPromotionAppService promotionAppService)
        {
            _promotionAppService = promotionAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Promotion> promotion = await _promotionAppService.GetPromotionsAsync();
            return new JsonResult(promotion);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var promotion = await _promotionAppService.GetPromotionAsync(id);
            return new JsonResult(promotion);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Promotion value)
        {
            var result = _promotionAppService.AddPromotionAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Promotion value)
        {
            var result = await _promotionAppService.GetPromotionAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _promotionAppService.EditPromotionAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _promotionAppService.GetPromotionAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _promotionAppService.DeletePromotionAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}