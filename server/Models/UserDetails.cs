using System;

namespace server.Models;

public class UserDetails
{
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Mobile{ get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string[] Image { get; set; }
    public double Balance { get; set; }
}
