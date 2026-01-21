using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignFactory.Data;
using SignFactory.Entities.Dtos;
using SignFactory.Entities.Dtos.Order;
using SignFactory.Entities.Entity_Models;
using SignFactory.Logic.Logic;

namespace SignFactory.Endpoint.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        OrderLogic logic;

        SignFactoryDbContext ctx;

        public OrderController(OrderLogic logic)
        {
            this.logic = logic;
        }

        [HttpPost]
        //[Authorize]
        public void AddOrder(OrderCreateDto dto)
        {
            logic.CreateOrder(dto);
        }

        [HttpGet]
        //[Authorize(Roles= "Admin")]

        public IEnumerable<OrderFullViewDto> GetAllOrders()
        {
            return logic.GetAllOrders();
        }

        [HttpGet("{id}")]
        //[Authorize]
        public OrderShortViewDto GetOrderByID(string id)
        {
            return logic.GetOrderByID(id);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]

        public void DeleteOrder(string id)
        {
            logic.DeleteOrder(id);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles ="Admin,ProjectManager")]

        public void UpdateOrder(string id, [FromBody] OrderUpdateDto dto)
        {
            logic.UpdateOrder(id, dto);
        }


        [HttpGet("stats/max-order-current-month")]
        public async Task<ActionResult<MaxOrderCurrentMonthDto>> GetMaxOrderCurrentMonth()
        {
            var result = await logic.GetMaxOrderCurrentMonthAsync();
            if (result == null)
                return NotFound();  // Ha nincs rendelés ebben a hónapban
            return Ok(result);
        }

        [HttpGet("stats/orders-per-month")]
        public async Task<ActionResult<List<MonthlyOrderCountDto>>> GetOrdersPerMonth()
        {
            var results = await logic.GetMonthlyOrderCountsAsync();
            // Üres lista esetén is 200 OK-t adunk vissza (nincs rendelés az adatbázisban vagy még egy hónapban sem)
            return Ok(results);
        }

        [HttpGet("stats/project-counts-per-order")]
        public async Task<ActionResult<List<ProjectCountPerOrderDto>>> GetProjectCountsPerOrderThisMonth()
        {
            var result = await logic.GetProjectCountsPerOrderThisMonthAsync();
            return Ok(result);
        }


    }
}
