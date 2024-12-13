using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/foods")]
    [ApiController]
    public class FoodDetailsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetFoods()
        {
            return Ok(ApplicationDBContext._foodList);
        }

        [HttpGet("{id}")]
        public IActionResult GetFoodByID(int id)
        {
            var food = ApplicationDBContext._foodList.Find(f => f.FoodID == id);
            if (food == null)
            {
                return NotFound();
            }
            return Ok(food);
        }

        [HttpPost]
        public IActionResult PostFood([FromBody] FoodDetails food)
        {
            food.FoodID = ApplicationDBContext._foodList.Count + 1;
            ApplicationDBContext._foodList.Add(food);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutFood([FromBody] FoodDetails food, int id)
        {
            var foodOld = ApplicationDBContext._foodList.Find(f => f.FoodID == id);
            if (foodOld == null)
            {
                return NotFound();
            }

            foodOld.FoodID = id;
            foodOld.FoodName = food.FoodName;
            foodOld.FoodPrice = food.FoodPrice;
            foodOld.AvailableQuantity = food.AvailableQuantity;

            return Ok();
        }

        [HttpPut("{id}/{count}")]
        public IActionResult UpdateCount(int id, int count)
        {
            var food = ApplicationDBContext._foodList.Find(f => f.FoodID == id);
            if (food == null)
            {
                return NotFound();
            }
            food.AvailableQuantity = count;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var food = ApplicationDBContext._foodList.Find(f => f.FoodID == id);
            if (food == null)
            {
                return NotFound();
            }
            ApplicationDBContext._foodList.Remove(food);
            return Ok();
        }
    }
}
