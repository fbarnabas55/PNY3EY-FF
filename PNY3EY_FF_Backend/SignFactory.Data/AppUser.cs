//using Microsoft.AspNetCore.Identity;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.Json.Serialization;
//using System.Threading.Tasks;

//namespace SignFactory.Data
//{
//    [JsonConverter(typeof(JsonStringEnumConverter))]
//    public enum UserRole
//    {
//        Admin,
//        ProjectManager,
//        Designer,
//        FactoryWorker
//    }
//    public class AppUser : IdentityUser
//    {
//        public string? FirstName { get; set; }
//        public string? LastName { get; set; }
//        public UserRole Role { get; set; }

//        public AppUser(string username) : base(username)
//        {

//        }

//        public AppUser()
//        {

//        }
//    }
//}
