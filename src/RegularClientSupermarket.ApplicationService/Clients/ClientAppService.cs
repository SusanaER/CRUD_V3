using Microsoft.EntityFrameworkCore;
using RegularClientSupermarket.Core.Client;
using RegularClientSupermarket.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegularClientSupermarket.ApplicationService.Clients
{
    public class ClientAppService : IClientAppService
    {
        private readonly IRepository<int, Client> _repository;

        public ClientAppService(IRepository<int, Client> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddClientAsync(Client client)
        {
            await _repository.AddAsync(client);
            return client.Id;
        }

        public async Task DeleteClientAsync(int clientId)
        {
            await _repository.DeleteAsync(clientId);
        }

        public async Task EditClientAsync(Client client)
        {
            await _repository.UpdateAsync(client);
        }

        public async Task<Client> GetClientAsync(int clientId)
        {
            return await _repository.GetAsync(clientId);
        }

        public async Task<List<Client>> GetClientsAsync()
        {
            var list = await _repository.GetAll().ToListAsync();
            return list;
        }
    }
}
