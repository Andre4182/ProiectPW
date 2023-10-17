using AutoShop.Context;
using AutoShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.RegularExpressions;
using System;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace AutoShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
           _authContext= appDbContext;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x=> x.Username == userObj.Username && x.Password == userObj.Password);
            
            if (user == null)
                return NotFound(new { Message = "User Not Found!" });

            user.Token = CreateJWTToken(user);
            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            }) ; 
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            //Check username

            if(await CheckUserNameExistAsync(userObj.Username))
                return BadRequest(new { Message = "Username already exists!" });

            //Check email

            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email already exists!" });


            //Check password strength

            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass });

            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            }); ;
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb= new StringBuilder();  
            if(password.Length<5)
            {
                sb.Append("Minimum password length should be 5" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);

            return sb.ToString();
        }

        private  Task<bool> CheckUserNameExistAsync(string username)
        =>  _authContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckEmailExistAsync(string email)
        => _authContext.Users.AnyAsync(x => x.Email == email);

        private string CreateJWTToken(User user)
        {
            var JWTTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name,$"{user.FistName}{user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = JWTTokenHandler.CreateToken(tokenDescriptor);
            return JWTTokenHandler.WriteToken(token);

        }
        [HttpGet] 
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
    }
}
