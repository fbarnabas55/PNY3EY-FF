

using System.ComponentModel.DataAnnotations;

namespace SignFactory.Entities.Dtos.Order
{
    public class OrderCreateDto
    {
        public string Id { get; set; } = " ";

        public string OrderName { get; set; } = " ";

        public string InstallationAdress { get; set; } = " ";

        public string PhoneNumber { get; set; } = " ";

        public string Email { get; set; } = " ";

        public DateTime Deadline { get; set; }
    }
}
