using Microsoft.EntityFrameworkCore;
using SalesSupermarket.Core.Sale;
using SalesSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesSupermarket.ApplicationService.Sales
{
    public class SaleAppService : ISaleAppService
    {
        private readonly IRepository<int, Sale> _repository;

        public SaleAppService(IRepository<int, Sale> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddSaleAsync(Sale sale)
        {
            /*HttpClientHandler clientHandler = new HttpClientHandler();
            HttpClient brand = new HttpClient(clientHandler);
            HttpResponseMessage responseOrigin = await brand.GetAsync($"https://host.docker.internal:773/Destination/{journey.OriginId}");
            responseOrigin.EnsureSuccessStatusCode();

            string responseOriginBody = await responseOrigin.Content.ReadAsStringAsync();

            var originR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseOriginBody);*/

            await _repository.AddAsync(sale);
            return sale.Id;
        }

        public async Task DeleteSaleAsync(int saleId)
        {
            await _repository.DeleteAsync(saleId);
        }

        public async Task EditSaleAsync(Sale sale)
        {
            await _repository.UpdateAsync(sale);
        }

        public async Task<Sale> GetSaleAsync(int saleId)
        {
            return await _repository.GetAsync(saleId);
        }

        public async Task<List<Sale>> GetSalesAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
