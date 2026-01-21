//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using SignFactory.Data;
//using SignFactory.Entities.Dtos.SignProject;
//using SignFactory.Entities.Dtos.User;
//using SignFactory.Entities.Entity_Models;
//using SignFactory.Logic.Helper;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace SignFactory.Endpoint.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        //UserManager<AppUser> userManager;
//        RoleManager<IdentityRole> roleManager;
//        DtoProvider dtoProvider;

//        public UserController(/*UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,*/ DtoProvider dtoProvider)
//        {
//            //this.userManager = userManager;
//            //this.roleManager = roleManager;
//            this.dtoProvider = dtoProvider;
//        }

//        [HttpPost("register")]
//        public async Task<OkObjectResult> Register(UserInputDto dto)
//        {
//            //var existingUser = await userManager.FindByNameAsync(dto.UserName);
//            if (existingUser != null)
//            {
//                throw new ArgumentException ("This username is already taken.");
//            }
//            var user = new AppUser(dto.UserName);
//            user.FirstName = dto.FirstName;
//            user.LastName = dto.LastName;
//            await userManager.CreateAsync(user, dto.Password);
//            if (userManager.Users.Count() == 1)
//            {
//                await roleManager.CreateAsync(new IdentityRole("Admin"));
//                await userManager.AddToRoleAsync(user, "Admin");
//            }
//            return Ok(new { Message = $"Welcome '{user.UserName}'." });
//        }

//        [HttpPost("login")]
//        public async Task<ActionResult> Login(UserLoginDto dto)
//        {
//            var user = await userManager.FindByNameAsync(dto.UserName);
//            if (user == null)
//            {
//                throw new ArgumentException("User not found");
//            }
//            else
//            {
//                var result = await userManager.CheckPasswordAsync(user, dto.Password);
//                if (!result)
//                {
//                    throw new ArgumentException("Incorrect password");
//                }
//                else
//                {
//                    var claim = new List<Claim>();
//                    claim.Add(new Claim(ClaimTypes.Name, user.UserName!));
//                    claim.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
//                    foreach (var role in await userManager.GetRolesAsync(user))
//                    {
//                        claim.Add(new Claim(ClaimTypes.Role, role));
//                    }
//                    int expiryInMinutes = 24 * 60;
//                    var token = GenerateAccessToken(claim, expiryInMinutes);
//                    return Ok(new LoginResultDto()
//                    {
//                        Token = new JwtSecurityTokenHandler().WriteToken(token),
//                        Expiration = DateTime.Now.AddMinutes(expiryInMinutes)
//                    });

//                }
//            }
//        }

        
//        [HttpGet("GetAllUsers")]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            var users = userManager.Users.ToList();
//            var userDtos = new List<UserViewDto>();

//            foreach (var user in users)
//            {
//                var roles = await userManager.GetRolesAsync(user);
//                userDtos.Add(new UserViewDto
//                {
//                    UserName = user.UserName,
//                    IsAdmin = roles.Contains("Admin"),
//                    Roles = roles.ToList(),
//                    FirstName = user.FirstName,
//                    LastName = user.LastName
//                });
//            }

//            return Ok(userDtos);
//        }


//        [HttpGet("GiveRole/{username}")]
//        [Authorize(Roles = "Admin")]

//        public async Task<IActionResult> GiveRole(string username, UserRole userRole)
//        {
//            var user = await userManager.FindByNameAsync(username);
//            if (user == null)
//            {
//                return NotFound(new { Message = "User not found" });
//            }

//            string roleName = userRole.ToString();
//            if (!await roleManager.RoleExistsAsync(roleName))
//            {
//                var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
//                if (!roleResult.Succeeded)
//                {
//                    return StatusCode(500, new { Message = "Failed to create role", Errors = roleResult.Errors });
//                }
//            }

//            var result = await userManager.AddToRoleAsync(user, roleName);
//            if (!result.Succeeded)
//            {
//                return StatusCode(500, new { Message = "Failed to assign role", Errors = result.Errors });
//            }

//            return Ok(new { Message = $"Role '{roleName}' has been assigned to user '{user.UserName}'." });
//        }

//        [HttpGet("RevokeRole/{username}")]
//        [Authorize(Roles = "Admin")]

//        public async Task<IActionResult> RevokeRole(string username, UserRole userRole)
//        {
//            var user = await userManager.FindByNameAsync(username);
//            if (user == null)
//            {
//                return NotFound(new { Message = "User not found" });
//            }

//            string roleName = userRole.ToString();

//            var result = await userManager.RemoveFromRoleAsync(user, roleName);
//            if (!result.Succeeded)
//            {
//                return StatusCode(500, new { Message = "Failed to remove role", Errors = result.Errors });
//            }

//            return Ok(new { Message = $"Role '{roleName}' has been removed from user '{user.UserName}'." });
//        }

//        [HttpDelete("DeleteUser/{username}")]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> DeleteUser(string username)
//        {
//            var user = await userManager.FindByNameAsync(username);
//            if (user == null)
//            {
//                return NotFound(new { Message = "User not found" });
//            }
//            var result = await userManager.DeleteAsync(user);
//            if (!result.Succeeded)
//            {
//                return StatusCode(500, new { Message = "Failed to delete user", Errors = result.Errors });
//            }
//            return Ok(new { Message = $"User '{user.UserName}' has been deleted." });
//        }

//        private JwtSecurityToken GenerateAccessToken(IEnumerable<Claim>? claims,int expiryInMinutes)
//        {
//            var signinKey = new SymmetricSecurityKey(
//                  Encoding.UTF8.GetBytes("NagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcsNagyonhosszútitkosítókulcs"));
//            return new JwtSecurityToken(
//                  issuer: "SignFactory.com",
//                  audience: "SignFactory.com",
//                  claims: claims?.ToArray(),
//                  expires: DateTime.Now.AddMinutes(expiryInMinutes),
//                  signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
//                );
//        }
//    }
//}
