using Microsoft.EntityFrameworkCore;
using SalesSupermarket.Core.Sale;
using SalesSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

        public async Task<string> AddSaleAsync(Sale sale)
        {
            try
            {
                HttpClientHandler productHandler = new HttpClientHandler();
                productHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient product = new HttpClient(productHandler);
                HttpResponseMessage responseProduct = await product.GetAsync($"https://host.docker.internal:779/Product/{sale.ProducId}");
                responseProduct.EnsureSuccessStatusCode();

                string responseProductBody = await responseProduct.Content.ReadAsStringAsync();

                var ProductR = Newtonsoft.Json.JsonConvert.DeserializeObject(responseProductBody);

                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient client = new HttpClient(clientHandler);
                HttpResponseMessage responseClient = await client.GetAsync($"https://host.docker.internal:778/RegularClient/{sale.ClientId}");
                responseClient.EnsureSuccessStatusCode();

                string clientClientBody = await responseClient.Content.ReadAsStringAsync();

                var ClientR = Newtonsoft.Json.JsonConvert.DeserializeObject(clientClientBody);

                if (ClientR == null || ProductR == null)
                {
                    return "Error, client or product not exist";
                }
                else
                {
                    await _repository.AddAsync(sale);
                    return "Successfully added. ID: " + sale.Id;
                }
            }
            catch (Exception e)
            {
                return "Exception caught. " + e;
            }
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
