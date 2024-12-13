using System;

namespace server.Models;

public class FoodDetails
{
    public int FoodID { get; set; }
    public string FoodName { get; set; }
    public int FoodPrice { get; set; }
    public string[] Image { get; set; }
    public int AvailableQuantity { get; set; }
}
