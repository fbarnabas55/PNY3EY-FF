using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using SignFactory.Entities.Helpers;
using System.Globalization;

namespace SignFactory.Entities.Entity_Models
{
    public class Order : IIdEntity
    {

        public Order(string id, string orderName, string installationAdress, string phoneNumber, string email, DateTime deadline, DateTime startDate)
        {
            Id = id;
            OrderName = orderName;
            InstallationAdress = installationAdress;
            PhoneNumber = phoneNumber;
            Email = email;
            Deadline = deadline;
            StartDate = startDate;
        }

        public Order() { }

        [StringLength(30)]
        [Key]
        [Required]
        public string Id { get; set; }

        [StringLength(100)]
        [Required]
        public string OrderName { get; set; }

        [StringLength(100)]
        public string InstallationAdress { get; set; }

        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public DateTime StartDate { get; set; } = DateTime.Now.Date;

        [NotMapped]
        public virtual ICollection<Project>? Projects { get; set; }
        public virtual ICollection<Design>? Designs { get; set; }


    }
}
