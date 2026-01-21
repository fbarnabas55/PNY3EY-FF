using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos
{
    public class MaxOrderCurrentMonthDto
    {
        public string OrderName { get; set; }
        public decimal TotalValue { get; set; }
    }

    public class MonthlyOrderCountDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int OrderCount { get; set; }
    }

    public class ProjectCountPerOrderDto
    {
        public string OrderName { get; set; }
        public int ProjectCount { get; set; }
    }
}
