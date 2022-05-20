using SalesSupermarket.Core.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesSupermarket.ApplicationService.Sales
{
    public interface ISaleAppService
    {
        Task<List<Sale>> GetSalesAsync();

        Task<string> AddSaleAsync(Sale sale);

        Task DeleteSaleAsync(int saleId);

        Task<Sale> GetSaleAsync(int saleId);

        Task EditSaleAsync(Sale sale);
    }
}