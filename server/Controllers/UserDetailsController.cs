using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(ApplicationDBContext._userList);
        }

        [HttpGet("{id}")]
        public IActionResult GetUsers(int id)
        {
            var user = ApplicationDBContext._userList.Find(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            user.UserID = ApplicationDBContext._userList.Count + 1;
            ApplicationDBContext._userList.Add(user);
            return Ok();
        }

        [HttpPut("{id}/{amount}")]
        public IActionResult UpdateAmount(int id, int amount)
        {
            var user = ApplicationDBContext._userList.Find(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Balance = amount;
            return Ok(user);
        }
    }
}
