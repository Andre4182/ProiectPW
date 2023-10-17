using System.ComponentModel.DataAnnotations;

namespace AutoShop.Models
{
    public class User
    {
        [Key]
        public int Id {get; set;}
        public string FistName { get; set;}
        public string LastName { get; set;}
        public string Username { get; set;}
        public string Password { get; set;}
        public string Email { get; set;}
        public string Token { get; set;}
        public string Role { get; set; }
            
    }
}
