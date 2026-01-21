using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignFactory.Data;
using SignFactory.Entities.Dtos.Order;
using SignFactory.Entities.Dtos.SignProject;
using SignFactory.Entities.Entity_Models;
using SignFactory.Logic.Logic;

namespace SignFactory.Endpoint.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,ProjectManager")]

    public class ProjectController : ControllerBase
    {

        ProjectLogic logic;

        SignFactoryDbContext ctx;

        public ProjectController(ProjectLogic logic)
        {
            this.logic = logic;
        }

        [HttpPost]
        public void AddProject(ProjectCreateDto dto, PackageDemand packageDemand)
        {
            logic.CreateProject(dto,packageDemand);
            var demands = Enum.GetNames(typeof(PackageDemand));
        }

        [HttpGet]
        public IEnumerable<ProjectFullViewDto> GetAllProjects()
        {
            return logic.GetAllProjects();
        }

        [HttpGet("{id}")]
        public ProjectShortViewDto GetProjectByID(string id)
        {
            return logic.GetProjectByID(id);
        }

        [HttpGet("order/{orderId}")]
        public List<ProjectShortViewDto> GetProjectsByOrder(string orderId)
        {
            return logic.GetProjectsByOrder(orderId);
        }

        [HttpPut("{id}")]
        public void UpdateProject(string id, [FromBody] ProjectUpdateDto dto)
        {
            logic.UpdateProject(id, dto);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public void DeleteProject(string id)
        {
            logic.DeleteProject(id);
        }
    }
}
