using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MovieClub.Endpoint.Helpers;
using SignFactory.Data;
using SignFactory.Logic.Helper;
using SignFactory.Logic.Logic;
using System.Text.Json.Serialization;

namespace SignFactory
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.

            builder.Services.AddTransient(typeof(Repository<>));
            builder.Services.AddTransient<DtoProvider>();
            builder.Services.AddTransient<OrderLogic>();
            builder.Services.AddTransient<ProjectLogic>();
            builder.Services.AddTransient<SignDesignLogic>();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            //builder.Services.AddIdentity<AppUser, IdentityRole>(
            //        option =>
            //        {
            //            option.Password.RequireDigit = false;
            //            option.Password.RequiredLength = 6;
            //            option.Password.RequireNonAlphanumeric = false;
            //            option.Password.RequireUppercase = false;
            //            option.Password.RequireLowercase = false;
            //        }
            //)
            //    .AddRoles<IdentityRole>()
            //    .AddEntityFrameworkStores<SignFactoryDbContext>()
            //    .AddDefaultTokenProviders();

            //builder.Services.AddAuthentication(option =>
            //{
            //    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    options.SaveToken = true;
            //    options.RequireHttpsMetadata = true;
            //    options.TokenValidationParameters = new TokenValidationParameters()
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidAudience = "SignFactory.com",
            //        ValidIssuer = "SignFactory.com",
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("NagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcs"))
            //    };
            //}); ;

            builder.Services.AddDbContext<SignFactoryDbContext>(options =>
            {
                options.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=SignFactoryDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True");
                options.UseLazyLoadingProxies();
            });

            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            builder.Services.AddControllers(opt =>
            {
                opt.Filters.Add<ExceptionFilter>();
                opt.Filters.Add<ValidationFilterAttribute>();
            });

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
            



            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "SignFactory", Version = "v1" });
    //            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    //            {
    //                In = ParameterLocation.Header,
    //                Description = "Please enter a valid token",
    //                Name = "Authorization",
    //                Type = SecuritySchemeType.Http,
    //                BearerFormat = "JWT",
    //                Scheme = "Bearer"
    //            });
    //            option.AddSecurityRequirement(new OpenApiSecurityRequirement
    //{
    //    {
    //        new OpenApiSecurityScheme
    //        {
    //            Reference = new OpenApiReference
    //            {
    //                Type=ReferenceType.SecurityScheme,
    //                Id="Bearer"
    //            }
    //        },
    //        new string[]{}
    //    }
    //});
            });
            var app = builder.Build();


            app.UseCors();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }



            app.UseHttpsRedirection();

            //app.UseAuthentication();
            //app.UseAuthorization();


            app.MapControllers();

            app.Run();



        }
    }
}
