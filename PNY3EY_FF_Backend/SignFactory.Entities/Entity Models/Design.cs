using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using SignFactory.Entities.Helpers;

namespace SignFactory.Entities.Entity_Models
{
    public enum Lightings
    {
        LED,
        Neon,
        Halogen
    }
    public enum Brightness
    {
        Low,
        Medium,
        High
    }
    public enum Material
    {
        Steel,
        Aluminium,
        StainlessSteel,
        Plastic
    }
    public class Design : IIdEntity
    {
        public Design(string id, string orderId, Order? order, string decor, string description, string fixing, int height, int width, Lightings lightings, Brightness brightness, Material material)
        {
            Id = Guid.NewGuid().ToString();
            OrderId = orderId;
            Order = order;
            Decor = decor;
            Description = description;
            Fixing = fixing;
            Height = height;
            Width = width;
            Lightings = lightings;
            Brightness = brightness;
            Material = material;
        }

        public Design() { }

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
        public string Decor { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(100)]
        [Required]
        public string Fixing { get; set; }

        [Required]
        public double Height { get; set; }

        [Required]
        public double Width { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Required]
        public Lightings Lightings { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Required]
        public Brightness Brightness { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        [Required]
        public Material Material { get; set; }




    }
}

