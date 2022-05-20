using RegularClientSupermarket.Core.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegularClientSupermarket.ApplicationService.Clients
{
    public interface IClientAppService
    {
        Task<List<Client>> GetClientsAsync();

        Task<int> AddClientAsync(Client client);

        Task DeleteClientAsync(int clientId);

        Task<Client> GetClientAsync(int clientId);

        Task EditClientAsync(Client client);
    }
}
