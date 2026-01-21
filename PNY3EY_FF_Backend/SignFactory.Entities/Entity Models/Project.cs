using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SignFactory.Entities.Helpers;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace SignFactory.Entities.Entity_Models
{
    public enum PackageDemand
    {
        Foiled,
        Boxed,
        Stocked
    }
    

    public class Project : IIdEntity
    {
        public Project(string orderId, string projectName, string description, string installationAdress, int price, PackageDemand packageDemand)
        {
            Id = Guid.NewGuid().ToString();
            OrderId = orderId;
            ProjectName = projectName;
            Description = description;
            Price = price;
            PackageDemand = packageDemand;

        }

        public Project() { }

        [StringLength(50)]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public string Id { get; set; }

        [StringLength(30)]
        [Required]
        public string OrderId { get; set; }

        [NotMapped]
        public virtual Order? Order { get; set; }

        [StringLength(100)]
        [Required]
        public string ProjectName { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(100)]
        [Required]
        public string ProjectManager { get; set; }

        [Required]
        public int Price { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Required]
        public PackageDemand PackageDemand { get; set; }

        [Required]
        public DateTime StartDate { get; set; } = DateTime.Now.Date;


    }
}
