using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SignFactory.Data;
using SignFactory.Entities.Dtos.Design;
using SignFactory.Entities.Dtos.Order;
using SignFactory.Entities.Dtos.SignProject;
//using SignFactory.Entities.Dtos.User;
using SignFactory.Entities.Entity_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Logic.Helper
{
    public class DtoProvider
    {
        //UserManager<AppUser> userManager;

        public Mapper Mapper { get; }
        public DtoProvider(/*UserManager<AppUser> userManager*/)
        {
            //this.userManager = userManager;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Order, OrderFullViewDto>();
                cfg.CreateMap<Order, OrderShortViewDto>();
                cfg.CreateMap<OrderUpdateDto, Order>();
                cfg.CreateMap<OrderCreateDto, Order>();
                cfg.CreateMap<ProjectCreateDto, Project>();
                cfg.CreateMap<ProjectUpdateDto, Project>();
                cfg.CreateMap<Project, ProjectFullViewDto>();
                cfg.CreateMap<Project, ProjectShortViewDto>();
                cfg.CreateMap<DesignCreateDto, Design>();
                cfg.CreateMap<DesignFullViewDto, Design>();
                cfg.CreateMap<Design, DesignFullViewDto>();
                cfg.CreateMap<Design, DesignShortViewDto>();
                //cfg.CreateMap<AppUser, UserViewDto>()

                //.AfterMap((src, dest) =>
                //{
                //    dest.IsAdmin = userManager.IsInRoleAsync(src, "Admin").Result;
                //});
            });

            Mapper = new Mapper(config);
        }
    }
}
