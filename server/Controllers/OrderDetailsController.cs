using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(ApplicationDBContext._orderList);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderByItemID(int id)
        {
            var order = ApplicationDBContext._orderList.Find(o => o.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPut("{id}")]
        public IActionResult PutOrder([FromBody] OrderDetails order, int id)
        {
            if (order == null)
            {
                return BadRequest();
            }

            var orderOld = ApplicationDBContext._orderList
                .Find(o => o.OrderID == id && o.OrderStatus == OrderStatus.Ordered);

            if (orderOld == null)
            {
                return NotFound();
            }

            orderOld.OrderStatus = order.OrderStatus;
            orderOld.TotalPrice = order.TotalPrice;

            var index = ApplicationDBContext._orderList.FindIndex(o => o.OrderID == id);
            if (index >= 0)
            {
                ApplicationDBContext._orderList[index] = orderOld;
            }

            return Ok(orderOld);
        }

        [HttpPost]
        public IActionResult PostOrder([FromBody] OrderDetails order)
        {
            order.OrderID = ApplicationDBContext._orderList.Count + 1;
            ApplicationDBContext._orderList.Add(order);
            return Ok(order);
        }
    }
}
