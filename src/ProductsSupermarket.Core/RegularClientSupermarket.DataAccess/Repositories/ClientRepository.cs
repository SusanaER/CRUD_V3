using Microsoft.EntityFrameworkCore;
using RegularClientSupermarket.Core.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegularClientSupermarket.DataAccess.Repositories
{
    public class ClientRepository : Repository<int, Client>
    {
        public ClientRepository(RegularClientSupermarketContext context) : base(context)
        {

        }

        public override async Task<Client> AddAsync(Client entity)
        {
            await Context.Clients.AddAsync(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Client> UpdateAsync(Client entity)
        {
            var client = await Context.Clients.FindAsync(entity.Id);
            client.Id = entity.Id;
            client.FirstName = entity.FirstName;
            client.LastName = entity.LastName;
            client.DateOfBirth = entity.DateOfBirth;
            client.Address = entity.Address;
            client.PostalCode = entity.PostalCode;
            client.PhoneNumber = entity.PhoneNumber;

            await Context.SaveChangesAsync();
            return entity;
        }

        public override async Task<Client> GetAsync(int id)
        {
            var client = await Context.Clients.FirstOrDefaultAsync(x => x.Id == id);
            return client;
        }
    }
}
