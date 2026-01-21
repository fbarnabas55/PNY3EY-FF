using Microsoft.EntityFrameworkCore;
using SignFactory.Entities.Entity_Models;
using SignFactory.Entities.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace SignFactory.Data
{
    public class Repository<T> where T : class, IIdEntity
    {
        SignFactoryDbContext ctx;
        public Repository(SignFactoryDbContext ctx)
        {
            this.ctx = ctx;
        }
        public void Create(T entity)
        {
            ctx.Set<T>().Add(entity);
            ctx.SaveChanges();
        }
        public T FindById(string id)
        {
            return ctx.Set<T>().FirstOrDefault(t => t.Id == id);
        }


        public void DeleteById(string id)
        {
            var entity = FindById(id);
            ctx.Set<T>().Remove(entity);
            ctx.SaveChanges();
        }

        public void Delete(T entity)
        {
            ctx.Set<T>().Remove(entity);
            ctx.SaveChanges();
        }

        public IQueryable<T> GetAll()
        {
            return ctx.Set<T>();
        }

        public void Update(T entity)
        {
            var old = FindById(entity.Id);


            ctx.Set<T>().Update(old);
            ctx.SaveChanges();
        }

        public List<Project> GetProjectsByOrderId(string orderId)
        {
            return ctx.Projects
                          .Where(p => p.OrderId == orderId)
                          .ToList();
        }

        public List<Design> GetDesignsByOrderId(string orderId)
        {
            return ctx.Designs
                .Where(d => d.OrderId == orderId)
                .ToList();
        }

    }
}
