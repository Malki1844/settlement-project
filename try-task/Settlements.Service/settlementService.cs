using Settlements.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Settlements.Service
{
    public class settlementService
    {
        private readonly ISettlementsReposutory _settlementsRepository;
        public settlementService(ISettlementsReposutory settlementsRepository)
        {
            _settlementsRepository=settlementsRepository;
        }

        public async Task<List<Settlement>> GetSettlementsAsync()
        {
            return await _settlementsRepository.GetSettlementsAsync();
        }
        public async Task PutAsync(int id, string name)
        {
           await _settlementsRepository.PutSettlementsAsync(id, name);
        }
        public async Task PostAsync(string name)
        {
           await _settlementsRepository.PostSettlementsAsync(name);
        }
        public async Task DeleteAsync(int id)
        {
          await  _settlementsRepository.DeleteSettlementsAsync(id);
        }
    }
}
