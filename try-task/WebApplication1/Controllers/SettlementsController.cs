using Microsoft.AspNetCore.Mvc;
using Settlements.Core;
using Settlements.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Settlements.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettlementsController : ControllerBase
    {
       private readonly settlementService _settlementService;
        public SettlementsController(settlementService settlementService)
        {
            _settlementService=settlementService;
        }

        // GET: api/<SettlementsController>
        [HttpGet]
        public Task<List<Settlement>> Get()
        {
            return _settlementService.GetSettlementsAsync();
        }

        // POST api/<SettlementsController>
        [HttpPost]
        public async Task Post([FromBody] string value)
        {
           await _settlementService.PostAsync(value);
        }

        // PUT api/<SettlementsController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] string value)
        {
         await _settlementService.PutAsync(id, value);
        }

        // DELETE api/<SettlementsController>/5
        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
           await _settlementService.DeleteAsync(id);
        }
    }
}
