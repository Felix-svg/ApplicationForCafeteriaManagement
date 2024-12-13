interface UserDetails {
  userID: any;
  userName: string;
  mobile: string;
  email: string;
  password: string;
  image: string[];
  balance: number;
}

interface FoodDetails {
  foodID: any;
  foodName: string;
  foodPrice: Number;
  image: string[];
  availableQuantity: number;
}

interface OrderDetails {
  orderID: any;
  userID: number;
  orderDate: string;
  totalPrice: number;
  orderStatus: OrderStatus;
}

interface CartItem {
  itemID: any;
  orderID: number;
  foodID: number;
  foodName: string;
  orderPrice: number;
  orderQuantity: number;
}

enum OrderStatus {
  Initiated = "Initiated",
  Ordered = "Ordered",
  Cancelled = "Cancelled",
}

let currentUser: UserDetails;
let curIndex: number | null;
let sign1 = document.getElementById("signin") as HTMLDivElement;
let sign2 = document.getElementById("signup") as HTMLDivElement;
let sign3 = document.getElementById("si") as HTMLDivElement;
let sign4 = document.getElementById("su") as HTMLDivElement;

let homes = document.getElementById("home") as HTMLDivElement;
let stocks = document.getElementById("stock") as HTMLDivElement;
let purchases = document.getElementById("purchase") as HTMLDivElement;
let historys = document.getElementById("history") as HTMLDivElement;
let topp = document.getElementById("top") as HTMLDivElement;
let showw = document.getElementById("show") as HTMLDivElement;
let carts = document.getElementById("cart") as HTMLDivElement;
let orderItems = document.getElementById("order-items") as HTMLDivElement;
let form1 = document.getElementById("form1") as HTMLDivElement;

let foodName = document.getElementById("foodName") as HTMLInputElement;
let foodCount = document.getElementById("foodCount") as HTMLInputElement;
let foodPrice = document.getElementById("foodPrice") as HTMLInputElement;
let purchaseDate = document.getElementById("purchaseDate") as HTMLInputElement;
let expiryDate = document.getElementById("expiryDate") as HTMLInputElement;
let itemImage = document.getElementById("itemImage") as HTMLInputElement;

let temporaryCart: Array<{
  itemId: number;
  orderId: number;
  foodID: number;
  foodName: string;
  orderPrice: number;
  orderQuantity: number;
}> = new Array<{
  itemId: number;
  orderId: number;
  foodID: number;
  foodName: string;
  orderPrice: number;
  orderQuantity: number;
}>();

//------------------------------------------------
// ---------Async Functions---------------------
async function fetchUsers(): Promise<UserDetails[]> {
  const apiUrl = "http://localhost:5130/api/users";
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Data");
  }
  return await response.json();
}

async function addUser(user: UserDetails): Promise<void> {
  const response = await fetch("http://localhost:5130/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
}

async function updateAmount(id: number, amount: number): Promise<UserDetails> {
  const response = await fetch(
    `http://localhost:5130/api/users/${id}/${amount}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
  return await response.json();
}

async function postFood(food: FoodDetails): Promise<void> {
  const response = await fetch("http://localhost:5130/api/foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
  foods();
}

async function postOrder(order: OrderDetails): Promise<OrderDetails> {
  const response = await fetch("http://localhost:5130/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Data");
  }
  return response.json();
}

async function fetchOrders(): Promise<OrderDetails[]> {
  const apiUrl = "http://localhost:5130/api/orders";
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Data");
  }
  return await response.json();
}

async function postCartItem(item: CartItem): Promise<CartItem> {
  const response = await fetch("http://localhost:5130/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
  return await response.json();
}

async function fetchFoods(): Promise<FoodDetails[]> {
  const apiUrl = "http://localhost:5130/api/foods";
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
  return await response.json();
}

async function deleteFood(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5130/api/foods/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
  foods();
}

async function updateFood(id: number, food: FoodDetails): Promise<void> {
  const response = await fetch(`http://localhost:5130/api/foods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  foods();
}

async function updateCartItem(cartItem: CartItem): Promise<void> {
  if (!cartItem.foodName) {
    cartItem.foodName = "Unknown";
  }

  const response = await fetch(
    `http://localhost:5130/api/cart/${cartItem.itemID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update cart item.");
  }
}

async function updateOrder(orderID: number, updatedOrder: OrderDetails) {
  const response = await fetch(`http://localhost:5130/api/orders/${orderID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedOrder),
  });
  if (!response.ok) {
    console.error("Failed to update order:", await response.text());
  }
}

async function updateFoodCount(id: number, count: number): Promise<void> {
  const response = await fetch(
    `http://localhost:5130/api/foods/${id}/${count}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("failed to fetch Data");
  }
}

async function fetchCartItems(orderID: number) {
  const response = await fetch(
    `http://localhost:5130/api/cart?orderID=${orderID}`
  );
  if (!response.ok) {
    console.error(`Error fetching cart items for orderID ${orderID}`);
    return [];
  }
  return await response.json();
}

//----------------------------------------------------
function signIn(): void {
  sign1.style.display = "block";
  sign2.style.display = "none";
  sign3.style.background = "orange";
  sign4.style.background = "none";
}

function signUp(): void {
  sign1.style.display = "none";
  sign2.style.display = "block";
  sign3.style.background = "none";
  sign4.style.background = "orange";
}

async function signUpSubmit(e: Event) {
  e.preventDefault();
  let name = document.getElementById("name") as HTMLInputElement;
  let email = document.getElementById("email") as HTMLInputElement;
  let mobile = document.getElementById("phone") as HTMLInputElement;
  let password = document.getElementById("password") as HTMLInputElement;
  let cpassword = document.getElementById("cpassword") as HTMLInputElement;
  var fileElement = document.getElementById("fileElement") as HTMLInputElement;

  var base64: string;
  var file;
  fileElement.addEventListener("change", () => {
    file = fileElement.files?.[0];
  });
  file = fileElement.files?.[0];

  // let phoneReg=/^[0-9]{10,10}$/;
  let passReg = /[a-zA-Z]{4,6}[@!#$%&*()]{1,2}[0-9]{1,4}/;

  if (password.value == cpassword.value) {
    let isavail: boolean = true;

    let UserArrayList = await fetchUsers();

    UserArrayList.forEach((val) => {
      if (val.email.toLowerCase() == email.value.toLowerCase()) {
        alert("you already have an ID. Please Sign In");
        isavail = false;
      }
    });

    if (file) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", (event) => {
        base64 = event.target?.result as string;
        if (isavail) {
          addUser({
            userID: undefined,
            userName: name.value,
            mobile: mobile.value,
            email: email.value,
            password: password.value,
            image: [base64],
            balance: 0,
          });
          signIn();
        }
      });
    }
  } else {
    var i = document.getElementById("signup") as HTMLDivElement;
    i.style.border = "2px solid red";
  }
}

function signInSubmit(e: Event) {
  e.preventDefault();
  let isavail: boolean = true;
  let email = document.getElementById("email1") as HTMLInputElement;

  let password = document.getElementById("password2") as HTMLInputElement;

  fetchUsers().then((UserArrayList) => {
    UserArrayList.forEach((val) => {
      if (
        val.email.toLowerCase() == email.value.toLowerCase() &&
        val.password == password.value
      ) {
        let a = document.getElementById("box") as HTMLDivElement;
        a.style.display = "none";
        let b = document.getElementById("menu") as HTMLDivElement;
        b.style.display = "block";
        isavail = false;
        currentUser = val;
        home();
        email.value = "";
        password.value = "";
        if (isavail) {
          alert("Invalid Email or Password");
        }
      }
    });
  });
}

function home() {
  displayNone();
  homes.style.display = "block";
  let a = document.getElementById("welcome") as HTMLHeadingElement;
  let b = document.getElementById("imgTag") as HTMLImageElement;
  a.innerHTML = "Welcome " + currentUser.userName;
  b.src = currentUser.image[0];
}

function displayNone() {
  homes.style.display = "none";
  stocks.style.display = "none";
  purchases.style.display = "none";
  historys.style.display = "none";
  topp.style.display = "none";
  showw.style.display = "none";
  carts.style.display = "none";
  form1.style.display = "none";
  orderItems.style.display = "none";
}

function recharge() {
  displayNone();
  topp.style.display = "block";
  (
    document.getElementById("curBalance") as HTMLHeadingElement
  ).innerHTML = `Available Balance :${currentUser.balance}`;
}

function show() {
  displayNone();
  showw.style.display = "block";
  let a = document.getElementById("balance") as HTMLHeadingElement;
  a.innerHTML = "Your Balance is " + currentUser.balance;
}

async function deposit() {
  let a = document.getElementById("amount") as HTMLInputElement;
  let amt: number = currentUser.balance + Number(a.value);
  currentUser = await updateAmount(currentUser.userID, amt);

  alert("Amount Deposited Successfully");
  a.value = "";
  (
    document.getElementById("curBalance") as HTMLHeadingElement
  ).innerHTML = `Available Balance :${currentUser.balance}`;
}

function Logout() {
  displayNone();
  temporaryCart.length = 0; 
  (document.getElementById("menu") as HTMLDivElement).style.display = "none";
  (document.getElementById("box") as HTMLDivElement).style.display = "block";
}

//---------------------
async function foods() {
  displayNone();
  stocks.style.display = "block";
  let tbody = document.getElementById("tbody1") as HTMLTableSectionElement;
  tbody.innerHTML = "";
  let bookList = await fetchFoods();
  bookList.forEach((element) => {
    if (element.availableQuantity > 0) {
      let row = document.createElement("tr");
      row.innerHTML = `
  
        <td>${element.foodName}</td>
        <td>${element.foodPrice}</td>
        <td>${element.availableQuantity}</td>
        <td><img src='${element.image}'></td>
        <td>
        <button onclick="Edit(${element.foodID},'${element.foodName}',${element.foodPrice},${element.availableQuantity})">Edit</button>
        <button onclick="deleteFood(${element.foodID})">Delete</button>
        </td>
        `;
      tbody.appendChild(row);
    }
  });
}

function Edit(id: number, name: string, price: number, quan: number) {
  form1.style.display = "block";
  curIndex = id;
  foodName.value = name;
  foodPrice.value = price + "";
  foodCount.value = quan + "";
}

function Delete(id: number) {
  deleteFood(id);
}

var itemBase64: string;
function addProductTo() {
  if (curIndex != null) {
    var itemFile = itemImage.files?.[0];
    if (itemFile) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(itemFile);
      fileReader.addEventListener("load", (event) => {
        itemBase64 = event.target?.result as string;
        if (curIndex != null) {
          updateFood(curIndex, {
            foodID: curIndex,
            foodName: foodName.value,
            foodPrice: Number(foodPrice.value),
            availableQuantity: +foodCount.value,
            image: [itemBase64],
          });
        }

        curIndex = null;
        foodName.value = "";
        foodCount.value = "";
        foodPrice.value = "";
      });
    }
  } else {
    var itemFile = itemImage.files?.[0];
    if (itemFile) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(itemFile);
      fileReader.addEventListener("load", (event) => {
        itemBase64 = event.target?.result as string;

        postFood({
          foodID: undefined,
          foodName: foodName.value,
          foodPrice: Number(foodPrice.value),
          availableQuantity: Number(foodCount.value),
          image: [itemBase64],
        });
      });
    }
  }
}

//-----------------------
async function purchase() {
  displayNone();
  purchases.style.display = "block";
  let tbody = document.getElementById("product-cont") as HTMLDivElement;

  tbody.innerHTML = "";
  let foodListt = await fetchFoods();
  foodListt.forEach((element) => {
    if (element.availableQuantity > 0) {
      let row = document.createElement("div");
      row.className = "product-card";
      row.innerHTML = `
        
     <div class="product-info">
        <img src="${element.image}" alt="${element.foodName}">
        <div class="product-info">
        <h5>${element.foodName}</h5>
        <h5>Rs. ${element.foodPrice}</h5>
        <h5>In Stock: ${element.availableQuantity}</h5>
    </div>
    <button 
      onclick="addCart('${element.foodName}', ${element.foodPrice}, ${
        element.availableQuantity
      }, ${element.foodID})" 
      ${element.availableQuantity <= 0 ? "disabled" : ""}>
      ${element.availableQuantity > 0 ? "Add To Cart" : "Out of Stock"}
    </button>

        `;
      tbody.appendChild(row);
    }
  });
}

async function addCart(
  foodName: string,
  foodPrice: number,
  availableQuantity: number,
  foodID: number
) {
  const count: number = Number(prompt("Enter Quantity"));

  if (count < 1) {
    alert("Please enter a valid quantity");
    return;
  } else if (count > availableQuantity) {
    alert(
      `Entered Quantity Not Available \n Available Quantity: ${availableQuantity}`
    );
    return;
  }

  const orderList = await fetchOrders();
  const newOrderId = orderList.length + 1;

  temporaryCart.push({
    itemId: temporaryCart.length + 1,
    orderId: newOrderId,
    foodID: foodID,
    foodName: foodName,
    orderPrice: count * foodPrice,
    orderQuantity: count,
  });

  alert(`Added to the cart.`);
}

async function cart() {
  displayNone();
  carts.style.display = "block";
  let tbody = document.getElementById("tbody3") as HTMLTableSectionElement;
  tbody.innerHTML = "";
  temporaryCart.forEach((element) => {
    let row = document.createElement("tr");
    row.innerHTML = `

         <td>${element.foodName}</td>
        <td>${element.orderQuantity}</td>
      <td>${element.orderPrice}</td>
      <td>
        <button onclick="deleteID(${element.itemId})">Delete</button>
      </td>
        `;
    tbody.appendChild(row);
  });
}

async function buy() {
  var foods: FoodDetails[] = await fetchFoods();
  let total = 0;

  temporaryCart.forEach((item) => {
    total += item.orderPrice;
  });

  if (total <= currentUser.balance) {
    const newOrder: OrderDetails = await postOrder({
      orderID: undefined,
      userID: currentUser.userID,
      orderDate: new Date().toISOString(),
      totalPrice: total,
      orderStatus: OrderStatus.Ordered,
    });

    for (const item of temporaryCart) {
      var food = foods.find((food) => food.foodID == item.foodID);
      const cartItem = {
        itemID: undefined,
        orderID: newOrder.orderID,
        foodID: item.foodID,
        foodName: item.foodName,
        orderPrice: item.orderPrice,
        orderQuantity: item.orderQuantity,
      };
      await postCartItem(cartItem);

      await updateFoodCount(
        item.foodID,
        food!.availableQuantity - item.orderQuantity
      );
    }

    currentUser = await updateAmount(
      currentUser.userID,
      currentUser.balance - total
    );

    temporaryCart.length = 0;

    cart();
    alert("Order placed successfully!");
  } else {
    alert("Insufficient Balance");
  }
}

async function cancelOrder(id: number) {
  const foodList: FoodDetails[] = await fetchFoods();
  const cartItemList: CartItem[] = await fetchCartItems(id);
  let orderList: OrderDetails[] = await fetchOrders();

  let order = orderList.find((value) => value.orderID == id);
  if (
    order != undefined &&
    order.userID == currentUser.userID &&
    order.orderStatus == OrderStatus.Ordered
  ) {
    order.orderStatus = OrderStatus.Cancelled;
    currentUser = await updateAmount(
      currentUser.userID,
      currentUser.balance + order.totalPrice
    );

    cartItemList.forEach((item) => {
      if (item.orderID === order.orderID) {
        foodList.forEach(async (food) => {
          if (food.foodID === item.foodID) {
            await updateFoodCount(
              food?.foodID,
              food!.availableQuantity + item.orderQuantity
            );
          }
        });
      }
    });

    await updateOrder(id, order);
    orderHistory();
    alert("Order Cancelled");
  }
}

async function modifyOrder(orderID: number) {
  const orderList: OrderDetails[] = await fetchOrders();
  const order = orderList.find((order) => order.orderID === orderID);

  if (!order) {
    alert("Order not found.");
    return;
  }
  displayOrderItems(orderID);
}

function addFood() {
  form1.style.display = "block";
}

function deleteID(itemId: number) {
  const index = temporaryCart.findIndex((item) => item.itemId === itemId);
  if (index !== -1) {
    temporaryCart.splice(index, 1);
    alert("Item removed from cart.");
    cart();
  }
}

async function orderHistory() {
  displayNone();
  historys.style.display = "block";

  let orderTable = document.getElementById("tb3") as HTMLTableElement;
  let len = orderTable?.getElementsByTagName("tr").length;

  if (orderTable?.hasChildNodes()) {
    for (let i = len! - 1; i >= 1; i--) {
      orderTable.removeChild(orderTable.children[i]);
    }
  }

  let orderList: OrderDetails[] = await fetchOrders();
  orderList.forEach((order) => {
    if (order.userID == currentUser.userID) {
      let row = document.createElement("tr");
      let cancelButton =
        order.orderStatus === "Ordered"
          ? `<button onclick="cancelOrder(${order.orderID})" id="tab" style="background-color: red; color: white;">Cancel</button>`
          : `<button id="tab" style="background-color: green; color: white;" disabled>Cancelled</button>`;

      let modifyButton =
        order.orderStatus === "Ordered"
          ? `<button onclick="modifyOrder(${order.orderID})" id="tab" style="background-color: blue; color: white;">Edit</button>`
          : "";

      row.innerHTML = `
            <td>${order.totalPrice}</td>
            <td>${order.orderDate
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/")}</td>
            <td>${order.orderStatus}</td>
            <td>
              ${cancelButton} ${modifyButton}
            </td>
          `;
      orderTable?.appendChild(row);
    }
  });
}

async function displayOrderItems(orderID: number) {
  displayNone();

  orderItems.style.display = "block";

  let orderTable = document.getElementById("tb4") as HTMLTableElement;

  if (orderTable) {
    orderTable.innerHTML = `<tr>
      <th>Food Name</th>
      <th>Order Price</th>
      <th>Order Quantity</th>
      <th>Actions</th>
    </tr>`;
  }

  const foodList: FoodDetails[] = await fetchFoods();
  const orderList: OrderDetails[] = await fetchOrders();
  const currentUserOrders = orderList.filter(
    (order) => order.userID === currentUser.userID
  );

  if (!currentUserOrders.length) {
    alert("No orders found for the current user.");
    return;
  }

  for (const order of currentUserOrders) {
    const cartItems = await fetchCartItems(orderID);
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];

    for (const item of itemsArray) {
      const food = foodList.find((food) => food.foodID === item.foodID);
      const row = document.createElement("tr");

      const modifyButton =
        order.orderStatus === "Ordered"
          ? `<button onclick="modifyCartItems(${item.itemID}, ${order.orderID})" 
                  style="background-color: blue; color: white;">Modify</button>`
          : "";

      row.innerHTML = `
          <td>${food!.foodName}</td>
          <td>${item.orderPrice}</td>
          <td>${item.orderQuantity}</td>
          <td>${modifyButton}</td>
        `;
      orderTable?.appendChild(row);
    }
  }
}

async function modifyCartItems(itemID: number, orderID: number) {
  const orderList = await fetchOrders();
  const cartItems = await fetchCartItems(orderID);

  const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];

  const selectedItem = itemsArray.find((item) => item.itemID === itemID);
  if (!selectedItem) {
    alert("Cart item not found.");
    return;
  }

  const foodList: FoodDetails[] = await fetchFoods();
  const food = foodList.find((food) => food.foodID === selectedItem.foodID);
  if (!food) {
    alert("Food item not found.");
    return;
  }

  const newQuantity = Number(
    prompt(`Enter the new quantity for ${food.foodName}:`)
  );
  if (isNaN(newQuantity) || newQuantity <= 0) {
    alert("Invalid quantity.");
    return;
  }

  const order = orderList.find((order) => order.orderID === orderID);

  let priceDifference = 0;

  if (newQuantity > selectedItem.orderQuantity) {
    const diff = newQuantity - selectedItem.orderQuantity;

    if (diff > food.availableQuantity) {
      alert("Not enough stock available.");
      return;
    }

    food.availableQuantity -= diff;
    await updateFoodCount(food.foodID, food.availableQuantity);

    priceDifference += diff * Number(food.foodPrice);

    currentUser.balance -= priceDifference;

    selectedItem.orderQuantity = newQuantity;
    selectedItem.orderPrice += priceDifference;

    if (order) {
      order.totalPrice += priceDifference;
      await updateOrder(orderID, order);
    }
  } else if (newQuantity < selectedItem.orderQuantity) {
    const diff = selectedItem.orderQuantity - newQuantity;

    food.availableQuantity += diff;
    await updateFoodCount(food.foodID, food.availableQuantity);

    priceDifference += diff * Number(food.foodPrice);

    currentUser.balance += priceDifference;

    selectedItem.orderQuantity = newQuantity;
    selectedItem.orderPrice -= priceDifference;

    if (order) {
      order.totalPrice -= priceDifference;
      await updateOrder(orderID, order);
    }
  }

  await updateCartItem(selectedItem);
  await orderHistory();
  alert("Order modified successfully!");
}
