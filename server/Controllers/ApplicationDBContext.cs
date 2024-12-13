using System;
using server.Models;

namespace server.Controllers;

public class ApplicationDBContext
{
    public static List<UserDetails> _userList = new List<UserDetails>
    {
        new UserDetails{UserID=1,UserName="John Doe",Mobile="555-555-666",Email="johndoe@mail.com", Password="1234", Balance=100},
         new UserDetails{UserID=1,UserName="Jane Doe",Mobile="432-333-543",Email="janedoe@mail.com", Password="5678", Balance=200}
    };
    public static List<FoodDetails> _foodList = new List<FoodDetails>
    {
        new FoodDetails{FoodID=1,FoodName="Coffee",FoodPrice=20,AvailableQuantity=100, Image = new string[]
        {
           "/client/images/coffee1.jpg"
        }},
        new FoodDetails{FoodID=2,FoodName="Tea",FoodPrice=15,AvailableQuantity=100, Image = new string[]
        {
           "/client/images/tea.jpg"
        }},
        new FoodDetails{FoodID=3,FoodName="Biscuit",FoodPrice=10,AvailableQuantity=100, Image = new string[]
        {
            "/client/images/biscuit.jpg"
        }},
        new FoodDetails{FoodID=4,FoodName="Juice",FoodPrice=50,AvailableQuantity=100, Image = new string[]
        {
            "/client/images/juice.jpg"
        }},
        new FoodDetails{FoodID=5,FoodName="Puff",FoodPrice=40,AvailableQuantity=100, Image = new string[]
        {
            "/client/images/puff.jpg"
        }},
        new FoodDetails{FoodID=6,FoodName="Milk",FoodPrice=10,AvailableQuantity=100, Image = new string[]
        {
            "/client/images/milk.jpg"
        }},
        new FoodDetails{FoodID=7,FoodName="Popcorn",FoodPrice=20,AvailableQuantity=20, Image = new string[]
        {
            "/client/images/popcorn.jpg"
        }}
    };
    public static List<CartItem> _cartItemList = new List<CartItem>{
        new CartItem{ItemID=1,OrderID=1,FoodID=1,OrderPrice=40,OrderQuantity=2},
          new CartItem{ItemID=2,OrderID=1,FoodID=2,OrderPrice=60,OrderQuantity=4},
             new CartItem{ItemID=3,OrderID=2,FoodID=1,OrderPrice=60,OrderQuantity=3}
    };
    public static List<OrderDetails> _orderList = new List<OrderDetails>{
        new OrderDetails{OrderID=1,UserID=1,TotalPrice=100,OrderDate=DateTime.Now,OrderStatus=OrderStatus.Ordered},
        new OrderDetails{OrderID=2,UserID=2,TotalPrice=60,OrderDate=DateTime.Now,OrderStatus=OrderStatus.Ordered}
    };
}
