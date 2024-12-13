using System;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class CartItem
{
    public int ItemID { get; set; }
    public int OrderID { get; set; }
    public int FoodID { get; set; }
    [Required(AllowEmptyStrings = true)]
    // public string FoodName { get; set; }
    public int OrderPrice { get; set; }
    public int OrderQuantity { get; set; }
}
