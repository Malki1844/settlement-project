using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Settlements.Core
{
    public interface ISettlementsReposutory
    {
        Task<List<Settlement>> GetSettlementsAsync();
        //string GetSettlementsById(int id);
        Task PostSettlementsAsync(string name);
        Task PutSettlementsAsync(int id, string value);
        Task DeleteSettlementsAsync(int id);
    }
}
