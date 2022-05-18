using ProductsSupermarket.Core.Brand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Brands
{
    public interface IBrandAppService
    {
        Task<List<Brand>> GetBrandsAsync();

        Task<int> AddBrandAsync(Brand brand);

        Task DeleteBrandAsync(int brandId);

        Task<Brand> GetBrandAsync(int brandId);

        Task EditBrandAsync(Brand brand);
    }
}

