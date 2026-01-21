using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos.Design
{
    public class DesignCreateDto
    {
        public required string OrderId { get; set; } = "";
        public required string Decor { get; set; } = "";
        public required string Description { get; set; } = "";
        public required string Fixing { get; set; } = "";
        public required double Height { get; set; }
        public required double Width { get; set; }
    }
}
