using SignFactory.Entities.Entity_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos.Design
{
    public class DesignShortViewDto
    {
        public string Id { get; set; }
        public string Decor { get; set; }
        public string Description { get; set; }
        public string Fixing { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
        public Lightings Lightings { get; set; }
        public Brightness Brightness { get; set; }
        public Material Material { get; set; }
    }
}
