using SignFactory.Entities.Dtos.Design;
using SignFactory.Entities.Dtos.SignProject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos.Order
{
    public class OrderUpdateDto
    {
        public string Id { get; set; } = " ";

        

        public string OrderName { get; set; } = " ";

        public string InstallationAdress { get; set; } = " ";

        public string PhoneNumber { get; set; } = " ";

        public string Email { get; set; } = " ";

        public DateTime? StartDate { get; set; }

        public DateTime Deadline { get; set; }
    }
}
