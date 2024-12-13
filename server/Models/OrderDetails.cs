using System;
using System.Text.Json.Serialization;

namespace server.Models;

public class OrderDetails
{
    public int OrderID { get; set; }
    public int UserID { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalPrice { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus OrderStatus { get; set; }
}

public enum OrderStatus
{
    Initiated = 1,
    Ordered = 2,
    Cancelled = 3
}