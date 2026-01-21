using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Converters;
using SignFactory.Entities.Entity_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SignFactory.Entities.Dtos.SignProject
{
    public class ProjectShortViewDto
    {
        public string Id { get; set; } = " ";
        public string ProjectName { get; set; } = " ";
        public string Description { get; set; } = " ";
        public int Price { get; set; }
        public string ProjectManager { get; set; } = " ";
        public PackageDemand PackageDemand { get; set; }
        public double NetPrice => Price * 1.27;

    }
}
