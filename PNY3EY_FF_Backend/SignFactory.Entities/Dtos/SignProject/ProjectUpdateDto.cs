using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SignFactory.Entities.Entity_Models;


namespace SignFactory.Entities.Dtos.SignProject
{
    public class ProjectUpdateDto
    {
        public string ProjectName { get; set; } = " ";
        public string Description { get; set; } = " ";
        public string ProjectManager { get; set; } = " ";
        public int Price { get; set; } 
        public PackageDemand PackageDemand { get; set; }
    }
}
