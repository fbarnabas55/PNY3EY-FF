using SignFactory.Entities.Entity_Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos.SignProject
{
    public class ProjectFullViewDto
    {
        public string Id { get; set; }

        public string OrderId { get; set; }

        public string ProjectName { get; set; }

        public string Description { get; set; }

        public string ProjectManager { get; set; }

        public int Price { get; set; }

        public double NetPrice => Price * 1.27;

        public PackageDemand PackageDemand { get; set; }

        public DateTime StartDate { get; set; } = DateTime.Now.Date;
    }
}
