using Microsoft.EntityFrameworkCore;
using SignFactory.Data;
using SignFactory.Entities.Dtos;
using SignFactory.Entities.Dtos.Order;
using SignFactory.Entities.Entity_Models;
using SignFactory.Logic.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Logic.Logic
{
    public class OrderLogic
    {
        Repository<Order> repo;
        DtoProvider dtoProvider;
        private readonly SignFactoryDbContext _context;
        public OrderLogic(Repository<Order> repo, DtoProvider dtoProvider, SignFactoryDbContext context)
        {
            this.repo = repo;
            this.dtoProvider = dtoProvider;
            _context = context;
        }

        public void CreateOrder(OrderCreateDto dto)
        {
            Order o = dtoProvider.Mapper.Map<Order>(dto);

            if (repo.GetAll().FirstOrDefault(x => x.Id == o.Id) == null)
            {
                repo.Create(o);
            }
            else { throw new Exception("Order already exists"); }

        }

        public IEnumerable<OrderFullViewDto> GetAllOrders()
        {
            return repo.GetAll().Select(x =>dtoProvider.Mapper.Map<OrderFullViewDto>(x));
        }

        public void DeleteOrder(string id)
        {
            repo.DeleteById(id);
        }

        public void UpdateOrder(string id, OrderUpdateDto dto)
        {
            var old = repo.FindById(id);
            dtoProvider.Mapper.Map(dto, old);
            repo.Update(old);
        }

        public OrderShortViewDto GetOrderByID(string id)
        {
            var model = repo.FindById(id);
            return dtoProvider.Mapper.Map<OrderShortViewDto>(model);
        }

        public async Task<MaxOrderCurrentMonthDto> GetMaxOrderCurrentMonthAsync()
        {
            // Aktuális dátum, év/hónap meghatározása
            DateTime now = DateTime.Now;
            int currentYear = now.Year;
            int currentMonth = now.Month;
            DateTime startOfMonth = new DateTime(currentYear, currentMonth, 1);
            DateTime nextMonth = startOfMonth.AddMonths(1);

            // Lekérdezés: aktuális hónap rendelései közül a legnagyobb összegű
            var maxOrder = _context.Orders
                .Select(o => new
                {
                    o.Id,
                    o.OrderName,
                    TotalPrice = o.Projects.Sum(p => p.Price),
                    o.StartDate
                })
                .Where(o => o.StartDate.Month == DateTime.Now.Month && o.StartDate.Year == DateTime.Now.Year)
                .OrderByDescending(o => o.TotalPrice)
                .FirstOrDefault();

            if (maxOrder == null)
                return null;  

            // DTO összeállítása az eredményből
            return new MaxOrderCurrentMonthDto
            {
                OrderName = maxOrder.OrderName,
                TotalValue = maxOrder.TotalPrice
            };
        }

        public async Task<List<MonthlyOrderCountDto>> GetMonthlyOrderCountsAsync()
        {
            // Csoportosítás év-hónap szerint és darabszám számítás
            var monthlyCounts = await _context.Orders
                .GroupBy(o => new { Year = o.StartDate.Year, Month = o.StartDate.Month })
                .Select(g => new MonthlyOrderCountDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    OrderCount = g.Count()
                })
                .OrderBy(dto => dto.Year)
                .ThenBy(dto => dto.Month)
                .ToListAsync();

            return monthlyCounts;
        }

        public async Task<List<ProjectCountPerOrderDto>> GetProjectCountsPerOrderThisMonthAsync()
        {
            DateTime now = DateTime.Now;
            DateTime startOfMonth = new DateTime(now.Year, now.Month, 1);
            DateTime nextMonth = startOfMonth.AddMonths(1);

            var results = await _context.Designs
                .Where(d => d.Order != null && d.Order.StartDate >= startOfMonth && d.Order.StartDate < nextMonth)
                .GroupBy(d => new { d.OrderId, d.Order.OrderName })
                .Select(g => new ProjectCountPerOrderDto
                {
                    OrderName = g.Key.OrderName,
                    ProjectCount = g.Count()
                })
                .OrderByDescending(x => x.ProjectCount)
                .ToListAsync();

            return results;
        }



    }
}
