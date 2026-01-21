using SignFactory.Entities.Entity_Models;


namespace SignFactory.Entities.Dtos.SignProject
{
    public class ProjectCreateDto
    {
        public required string OrderId { get; set; } = "";

        public required string ProjectName { get; set; } = "";

        public required string Description { get; set; } = "";

        public required string ProjectManager { get; set; } = "";

        public required int Price { get; set; }

    }
}
