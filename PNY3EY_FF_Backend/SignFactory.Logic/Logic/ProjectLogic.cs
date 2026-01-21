using SignFactory.Data;
using SignFactory.Entities.Dtos.SignProject;
using SignFactory.Entities.Entity_Models;
using SignFactory.Logic.Helper;

namespace SignFactory.Logic.Logic
{
    public class ProjectLogic
    {
        Repository<Project> repo;
        DtoProvider dtoProvider;
        public ProjectLogic(Repository<Project> repo, DtoProvider dtoProvider)
        {
            this.repo = repo;
            this.dtoProvider = dtoProvider;
        }

        public void CreateProject(ProjectCreateDto dto,PackageDemand packageDemand)
        {
            var model = dtoProvider.Mapper.Map<Project>(dto);
            model.PackageDemand = packageDemand;
            repo.Create(model);

        }

        public IEnumerable<ProjectFullViewDto> GetAllProjects()
        {
            return repo.GetAll().Select(x => dtoProvider.Mapper.Map<ProjectFullViewDto>(x));
        }

        public void DeleteProject(string id)
        {
            repo.DeleteById(id);
        }

        public ProjectShortViewDto GetProjectByID(string id)
        {
            var model = repo.FindById(id);
            return dtoProvider.Mapper.Map<ProjectShortViewDto>(model);
        }

        public List<ProjectShortViewDto> GetProjectsByOrder(string orderId)
        {
            var projects = repo.GetProjectsByOrderId(orderId);
            return projects.Select(p => dtoProvider.Mapper.Map<ProjectShortViewDto>(p)).ToList();
        }

        public void UpdateProject(string id, ProjectUpdateDto dto)
        {
            var old = repo.FindById(id);
            dtoProvider.Mapper.Map(dto, old);
            repo.Update(old);
        }




    }
}
