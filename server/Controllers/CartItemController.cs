using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCartItems(int orderID)
        {
            var cartItems = ApplicationDBContext._cartItemList
                .Where(item => item.OrderID == orderID)
                .ToList();

            if (!cartItems.Any())
            {
                return NoContent();
            }

            return Ok(cartItems);
        }


        [HttpGet("{id}")]
        public IActionResult GetCartItemsByID(int id)
        {
            var cartItem = ApplicationDBContext._cartItemList.Find(c => c.ItemID == id);

            if (cartItem == null)
            {
                Console.WriteLine($"Cart item with ID {id} not found.");
                return NotFound();
            }

            return Ok(cartItem);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateCartItem(int id, [FromBody] CartItem updatedItem)
        {
            if (updatedItem == null)
            {
                return BadRequest("Invalid cart item data.");
            }

            var cartItem = ApplicationDBContext._cartItemList.Find(ci => ci.ItemID == id);

            if (cartItem == null)
            {
                return NotFound($"Cart item with ID {id} not found.");
            }

            var food = ApplicationDBContext._foodList.FirstOrDefault(f => f.FoodID == cartItem.FoodID);

            if (food == null)
            {
                return BadRequest();
            }

            cartItem.OrderQuantity = updatedItem.OrderQuantity;
            cartItem.OrderPrice = updatedItem.OrderQuantity * food.FoodPrice;

            return Ok(cartItem);
        }

        [HttpPost]
        public IActionResult PostCartItem([FromBody] CartItem cartItem)
        {
            var order = ApplicationDBContext._orderList.FirstOrDefault(o => o.OrderID == cartItem.OrderID);
            if (order == null)
            {
                return BadRequest("Invalid OrderID.");
            }

            var food = ApplicationDBContext._foodList.FirstOrDefault(f => f.FoodID == cartItem.FoodID);
            if (food == null)
            {
                return BadRequest("Invalid FoodID.");
            }

            cartItem.ItemID = ApplicationDBContext._cartItemList.Count + 1;
            cartItem.OrderPrice = food.FoodPrice * cartItem.OrderQuantity;

            ApplicationDBContext._cartItemList.Add(cartItem);
            return Ok(cartItem);
        }
    }
}
