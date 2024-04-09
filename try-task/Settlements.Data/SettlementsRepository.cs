using Microsoft.EntityFrameworkCore;
using Settlements.Core;
namespace Settlements.Data
{
    public class SettlementsRepository:ISettlementsReposutory
    {
    private readonly DataContext _context;
    public SettlementsRepository(DataContext context)
    {
     _context = context;
    }
        public async Task<List<Settlement>> GetSettlementsAsync()
        {
            return await _context.settlements.ToListAsync();
        }
        public async Task PostSettlementsAsync(string value)
        {
            Settlement settlementAdd = new Settlement();
            settlementAdd.Name = value;
            await _context.settlements.AddAsync(settlementAdd);
            await  _context.SaveChangesAsync();
        }
        public async Task PutSettlementsAsync(int id, string value)
        {
            var findSettlements = _context.settlements.ToList().Find(x => x.Id==id);
            if (findSettlements!=null)
            {
                findSettlements.Name= value;
                await _context.SaveChangesAsync();
            }
        }
        public async Task DeleteSettlementsAsync(int id)
        {
            var deleteSettlements = _context.settlements.ToList().Find(x => x.Id==id);
            if (deleteSettlements!=null)
            {
                _context.settlements.Remove(deleteSettlements);
              await  _context.SaveChangesAsync();

            }
           
        }
    }
}
