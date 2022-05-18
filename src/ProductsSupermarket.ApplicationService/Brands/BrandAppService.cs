using Microsoft.EntityFrameworkCore;
using ProductsSupermarket.Core.Brand;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.ApplicationService.Brands
{
    public class BrandAppService : IBrandAppService
    {
        private readonly IRepository<int, Brand> _repository;

        public BrandAppService(IRepository<int, Brand> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddBrandAsync(Brand brand)
        {
            await _repository.AddAsync(brand);
            return brand.Id;
        }

        public async Task DeleteBrandAsync(int brandId)
        {
            await _repository.DeleteAsync(brandId);
        }

        public async Task EditBrandAsync(Brand brand)
        {
            await _repository.UpdateAsync(brand);
        }

        public async Task<Brand> GetBrandAsync(int brandId)
        {
            return await _repository.GetAsync(brandId);
        }

        public async Task<List<Brand>> GetBrandsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
