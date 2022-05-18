using Microsoft.AspNetCore.Mvc;
using RegularClientSupermarket.ApplicationService.Clients;
using RegularClientSupermarket.Core.Client;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace RegularClientSupermarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegularClientController : Controller
    {
        private readonly IClientAppService _clientAppService;

        public RegularClientController(IClientAppService clientAppService)
        {
            _clientAppService = clientAppService;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            List<Client> client = await _clientAppService.GetClientsAsync();
            return new JsonResult(client);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var client = await _clientAppService.GetClientAsync(id);
            return new JsonResult(client);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Client value)
        {
            var result = _clientAppService.AddClientAsync(value);
            return new JsonResult(JsonSerializer.Serialize(result));
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Client value)
        {
            var result = await _clientAppService.GetClientAsync(value.Id);
            if (result == null)
            {
                return new JsonResult("Id: " + value.Id + " not exist");
            }
            else
            {
                await _clientAppService.EditClientAsync(value);
                return new JsonResult("Id: " + value.Id + " edited");
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            var brand = await _clientAppService.GetClientAsync(id);
            if (brand == null)
            {
                return new JsonResult("Id: " + id + " not exist");
            }
            else
            {
                await _clientAppService.DeleteClientAsync(id);
                return new JsonResult("Id: " + id + " deleted");
            }
        }
    }
}