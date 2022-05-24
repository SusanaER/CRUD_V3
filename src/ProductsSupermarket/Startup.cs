using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ProductsSupermarket.ApplicationService.Brands;
using ProductsSupermarket.ApplicationService.Categories;
using ProductsSupermarket.ApplicationService.Inventories;
using ProductsSupermarket.ApplicationService.Products;
using ProductsSupermarket.ApplicationService.Promotions;
using ProductsSupermarket.Core.Brand;
using ProductsSupermarket.Core.Categories;
using ProductsSupermarket.Core.Inventory;
using ProductsSupermarket.Core.Product;
using ProductsSupermarket.Core.Promotion;
using ProductsSupermarket.DataAccess;
using ProductsSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProductsSupermarket
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("Docker");

            services.AddDbContext<ProductsSupermarketContex>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            services.AddCors();

            services.AddTransient<IProductAppService, ProductAppService>();
            services.AddTransient<IBrandAppService, BrandAppService>();
            services.AddTransient<ICategoryAppService, CategoryAppService>();
            services.AddTransient<IInventoryAppService, InventoryAppService>();
            services.AddTransient<IPromotionAppService, PromotionAppService>();

            services.AddTransient<IRepository<int, Product>, ProductRepository>();
            services.AddTransient<IRepository<int, Brand>, BrandRepository>();
            services.AddTransient<IRepository<int, Category>, CategoryRepository>();
            services.AddTransient<IRepository<int, Inventory>, InventoriesRepository>();
            services.AddTransient<IRepository<int, Promotion>, PromotionRepository>();

            services.AddControllers()
            .AddJsonOptions(o => o.JsonSerializerOptions
                .ReferenceHandler = ReferenceHandler.Preserve);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProductsSupermarket", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ProductsSupermarketContex db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductsSupermarket v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            db.Database.Migrate();
        }
    }
}
