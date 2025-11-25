using Microsoft.AspNetCore.Mvc;
using BookshopBackend.Data; // Adjust namespace accordingly
using System.Linq;

namespace BookshopBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BookshopContext _context;

        public AuthController(BookshopContext context)
        {
            _context = context;
        }

        // POST: api/auth/{role}-login
        [HttpPost("{role}-login")]
        public IActionResult Login(string role, [FromBody] LoginRequest loginRequest)
        {
            // Validate input
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Username) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest(new { status = "error", message = "Username and Password are required." });
            }

            Console.WriteLine($"Login attempt: Role = {role}, Username = {loginRequest.Username}");

            // Role-based authentication
            if (role == "admin")
            {
                var admin = _context.admins.FirstOrDefault(a => a.Username == loginRequest.Username && a.Password == loginRequest.Password);
                if (admin == null)
                {
                    return Unauthorized(new { status = "error", message = "Invalid admin credentials." });
                }

                return Ok(new { status = "success", role = "admin" });
            }
            else if (role == "customer")
            {
                var customer = _context.customers.FirstOrDefault(c => c.Username == loginRequest.Username && c.Password == loginRequest.Password);
                if (customer == null)
                {
                    return Unauthorized(new { status = "error", message = "Invalid customer credentials." });
                }

                return Ok(new { status = "success", role = "customer" });
            }

            return BadRequest(new { status = "error", message = "Invalid role specified. Use 'admin' or 'customer'." });
        }
    }

    // LoginRequest model
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty; // Ensure non-nullable defaults
        public string Password { get; set; } = string.Empty; // Ensure non-nullable defaults
    }
}