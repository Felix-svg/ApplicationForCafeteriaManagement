"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Initiated"] = "Initiated";
    OrderStatus["Ordered"] = "Ordered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
let currentUser;
let curIndex;
let sign1 = document.getElementById("signin");
let sign2 = document.getElementById("signup");
let sign3 = document.getElementById("si");
let sign4 = document.getElementById("su");
let homes = document.getElementById("home");
let stocks = document.getElementById("stock");
let purchases = document.getElementById("purchase");
let historys = document.getElementById("history");
let topp = document.getElementById("top");
let showw = document.getElementById("show");
let carts = document.getElementById("cart");
let orderItems = document.getElementById("order-items");
let form1 = document.getElementById("form1");
let foodName = document.getElementById("foodName");
let foodCount = document.getElementById("foodCount");
let foodPrice = document.getElementById("foodPrice");
let purchaseDate = document.getElementById("purchaseDate");
let expiryDate = document.getElementById("expiryDate");
let itemImage = document.getElementById("itemImage");
let temporaryCart = new Array();
//------------------------------------------------
// ---------Async Functions---------------------
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5130/api/users";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch Data");
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5130/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("failed to fetch Data");
        }
    });
}
function updateAmount(id, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/users/${id}/${amount}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("failed to fetch Data");
        }
        return yield response.json();
    });
}
function postFood(food) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5130/api/foods", {
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
    });
}
function postOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5130/api/orders", {
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
    });
}
function fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5130/api/orders";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch Data");
        }
        return yield response.json();
    });
}
function postCartItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5130/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            throw new Error("failed to fetch Data");
        }
        return yield response.json();
    });
}
function fetchFoods() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5130/api/foods";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch Data");
        }
        return yield response.json();
    });
}
function deleteFood(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/foods/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }
        foods();
    });
}
function updateFood(id, food) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/foods/${id}`, {
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
    });
}
function updateCartItem(cartItem) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cartItem.foodName) {
            cartItem.foodName = "Unknown";
        }
        const response = yield fetch(`http://localhost:5130/api/cart/${cartItem.itemID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItem),
        });
        if (!response.ok) {
            throw new Error("Failed to update cart item.");
        }
    });
}
function updateOrder(orderID, updatedOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/orders/${orderID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedOrder),
        });
        if (!response.ok) {
            console.error("Failed to update order:", yield response.text());
        }
    });
}
function updateFoodCount(id, count) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/foods/${id}/${count}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("failed to fetch Data");
        }
    });
}
function fetchCartItems(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5130/api/cart?orderID=${orderID}`);
        if (!response.ok) {
            console.error(`Error fetching cart items for orderID ${orderID}`);
            return [];
        }
        return yield response.json();
    });
}
//----------------------------------------------------
function signIn() {
    sign1.style.display = "block";
    sign2.style.display = "none";
    sign3.style.background = "orange";
    sign4.style.background = "none";
}
function signUp() {
    sign1.style.display = "none";
    sign2.style.display = "block";
    sign3.style.background = "none";
    sign4.style.background = "orange";
}
function signUpSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let mobile = document.getElementById("phone");
        let password = document.getElementById("password");
        let cpassword = document.getElementById("cpassword");
        var fileElement = document.getElementById("fileElement");
        var base64;
        var file;
        fileElement.addEventListener("change", () => {
            var _a;
            file = (_a = fileElement.files) === null || _a === void 0 ? void 0 : _a[0];
        });
        file = (_a = fileElement.files) === null || _a === void 0 ? void 0 : _a[0];
        // let phoneReg=/^[0-9]{10,10}$/;
        let passReg = /[a-zA-Z]{4,6}[@!#$%&*()]{1,2}[0-9]{1,4}/;
        if (password.value == cpassword.value) {
            let isavail = true;
            let UserArrayList = yield fetchUsers();
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
                    var _a;
                    base64 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
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
        }
        else {
            var i = document.getElementById("signup");
            i.style.border = "2px solid red";
        }
    });
}
function signInSubmit(e) {
    e.preventDefault();
    let isavail = true;
    let email = document.getElementById("email1");
    let password = document.getElementById("password2");
    fetchUsers().then((UserArrayList) => {
        UserArrayList.forEach((val) => {
            if (val.email.toLowerCase() == email.value.toLowerCase() &&
                val.password == password.value) {
                let a = document.getElementById("box");
                a.style.display = "none";
                let b = document.getElementById("menu");
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
    let a = document.getElementById("welcome");
    let b = document.getElementById("imgTag");
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
    document.getElementById("curBalance").innerHTML = `Available Balance :${currentUser.balance}`;
}
function show() {
    displayNone();
    showw.style.display = "block";
    let a = document.getElementById("balance");
    a.innerHTML = "Your Balance is " + currentUser.balance;
}
function deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        let a = document.getElementById("amount");
        let amt = currentUser.balance + Number(a.value);
        currentUser = yield updateAmount(currentUser.userID, amt);
        alert("Amount Deposited Successfully");
        a.value = "";
        document.getElementById("curBalance").innerHTML = `Available Balance :${currentUser.balance}`;
    });
}
function Logout() {
    displayNone();
    temporaryCart.length = 0;
    document.getElementById("menu").style.display = "none";
    document.getElementById("box").style.display = "block";
}
//---------------------
function foods() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        stocks.style.display = "block";
        let tbody = document.getElementById("tbody1");
        tbody.innerHTML = "";
        let bookList = yield fetchFoods();
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
    });
}
function Edit(id, name, price, quan) {
    form1.style.display = "block";
    curIndex = id;
    foodName.value = name;
    foodPrice.value = price + "";
    foodCount.value = quan + "";
}
function Delete(id) {
    deleteFood(id);
}
var itemBase64;
function addProductTo() {
    var _a, _b;
    if (curIndex != null) {
        var itemFile = (_a = itemImage.files) === null || _a === void 0 ? void 0 : _a[0];
        if (itemFile) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(itemFile);
            fileReader.addEventListener("load", (event) => {
                var _a;
                itemBase64 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
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
    }
    else {
        var itemFile = (_b = itemImage.files) === null || _b === void 0 ? void 0 : _b[0];
        if (itemFile) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(itemFile);
            fileReader.addEventListener("load", (event) => {
                var _a;
                itemBase64 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
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
function purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        purchases.style.display = "block";
        let tbody = document.getElementById("product-cont");
        tbody.innerHTML = "";
        let foodListt = yield fetchFoods();
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
      onclick="addCart('${element.foodName}', ${element.foodPrice}, ${element.availableQuantity}, ${element.foodID})" 
      ${element.availableQuantity <= 0 ? "disabled" : ""}>
      ${element.availableQuantity > 0 ? "Add To Cart" : "Out of Stock"}
    </button>

        `;
                tbody.appendChild(row);
            }
        });
    });
}
function addCart(foodName, foodPrice, availableQuantity, foodID) {
    return __awaiter(this, void 0, void 0, function* () {
        const count = Number(prompt("Enter Quantity"));
        if (count < 1) {
            alert("Please enter a valid quantity");
            return;
        }
        else if (count > availableQuantity) {
            alert(`Entered Quantity Not Available \n Available Quantity: ${availableQuantity}`);
            return;
        }
        const orderList = yield fetchOrders();
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
    });
}
function cart() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        carts.style.display = "block";
        let tbody = document.getElementById("tbody3");
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
    });
}
function buy() {
    return __awaiter(this, void 0, void 0, function* () {
        var foods = yield fetchFoods();
        let total = 0;
        temporaryCart.forEach((item) => {
            total += item.orderPrice;
        });
        if (total <= currentUser.balance) {
            const newOrder = yield postOrder({
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
                yield postCartItem(cartItem);
                yield updateFoodCount(item.foodID, food.availableQuantity - item.orderQuantity);
            }
            currentUser = yield updateAmount(currentUser.userID, currentUser.balance - total);
            temporaryCart.length = 0;
            cart();
            alert("Order placed successfully!");
        }
        else {
            alert("Insufficient Balance");
        }
    });
}
function cancelOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const foodList = yield fetchFoods();
        const cartItemList = yield fetchCartItems(id);
        let orderList = yield fetchOrders();
        let order = orderList.find((value) => value.orderID == id);
        if (order != undefined &&
            order.userID == currentUser.userID &&
            order.orderStatus == OrderStatus.Ordered) {
            order.orderStatus = OrderStatus.Cancelled;
            currentUser = yield updateAmount(currentUser.userID, currentUser.balance + order.totalPrice);
            cartItemList.forEach((item) => {
                if (item.orderID === order.orderID) {
                    foodList.forEach((food) => __awaiter(this, void 0, void 0, function* () {
                        if (food.foodID === item.foodID) {
                            yield updateFoodCount(food === null || food === void 0 ? void 0 : food.foodID, food.availableQuantity + item.orderQuantity);
                        }
                    }));
                }
            });
            yield updateOrder(id, order);
            orderHistory();
            alert("Order Cancelled");
        }
    });
}
function modifyOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderList = yield fetchOrders();
        const order = orderList.find((order) => order.orderID === orderID);
        if (!order) {
            alert("Order not found.");
            return;
        }
        displayOrderItems(orderID);
    });
}
function addFood() {
    form1.style.display = "block";
}
function deleteID(itemId) {
    const index = temporaryCart.findIndex((item) => item.itemId === itemId);
    if (index !== -1) {
        temporaryCart.splice(index, 1);
        alert("Item removed from cart.");
        cart();
    }
}
function orderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        historys.style.display = "block";
        let orderTable = document.getElementById("tb3");
        let len = orderTable === null || orderTable === void 0 ? void 0 : orderTable.getElementsByTagName("tr").length;
        if (orderTable === null || orderTable === void 0 ? void 0 : orderTable.hasChildNodes()) {
            for (let i = len - 1; i >= 1; i--) {
                orderTable.removeChild(orderTable.children[i]);
            }
        }
        let orderList = yield fetchOrders();
        orderList.forEach((order) => {
            if (order.userID == currentUser.userID) {
                let row = document.createElement("tr");
                let cancelButton = order.orderStatus === "Ordered"
                    ? `<button onclick="cancelOrder(${order.orderID})" id="tab" style="background-color: red; color: white;">Cancel</button>`
                    : `<button id="tab" style="background-color: green; color: white;" disabled>Cancelled</button>`;
                let modifyButton = order.orderStatus === "Ordered"
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
                orderTable === null || orderTable === void 0 ? void 0 : orderTable.appendChild(row);
            }
        });
    });
}
function displayOrderItems(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        orderItems.style.display = "block";
        let orderTable = document.getElementById("tb4");
        if (orderTable) {
            orderTable.innerHTML = `<tr>
      <th>Food Name</th>
      <th>Order Price</th>
      <th>Order Quantity</th>
      <th>Actions</th>
    </tr>`;
        }
        const foodList = yield fetchFoods();
        const orderList = yield fetchOrders();
        const currentUserOrders = orderList.filter((order) => order.userID === currentUser.userID);
        if (!currentUserOrders.length) {
            alert("No orders found for the current user.");
            return;
        }
        for (const order of currentUserOrders) {
            const cartItems = yield fetchCartItems(orderID);
            const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
            for (const item of itemsArray) {
                const food = foodList.find((food) => food.foodID === item.foodID);
                const row = document.createElement("tr");
                const modifyButton = order.orderStatus === "Ordered"
                    ? `<button onclick="modifyCartItems(${item.itemID}, ${order.orderID})" 
                  style="background-color: blue; color: white;">Modify</button>`
                    : "";
                row.innerHTML = `
          <td>${food.foodName}</td>
          <td>${item.orderPrice}</td>
          <td>${item.orderQuantity}</td>
          <td>${modifyButton}</td>
        `;
                orderTable === null || orderTable === void 0 ? void 0 : orderTable.appendChild(row);
            }
        }
    });
}
function modifyCartItems(itemID, orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderList = yield fetchOrders();
        const cartItems = yield fetchCartItems(orderID);
        const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
        const selectedItem = itemsArray.find((item) => item.itemID === itemID);
        if (!selectedItem) {
            alert("Cart item not found.");
            return;
        }
        const foodList = yield fetchFoods();
        const food = foodList.find((food) => food.foodID === selectedItem.foodID);
        if (!food) {
            alert("Food item not found.");
            return;
        }
        const newQuantity = Number(prompt(`Enter the new quantity for ${food.foodName}:`));
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
            yield updateFoodCount(food.foodID, food.availableQuantity);
            priceDifference += diff * Number(food.foodPrice);
            currentUser.balance -= priceDifference;
            selectedItem.orderQuantity = newQuantity;
            selectedItem.orderPrice += priceDifference;
            if (order) {
                order.totalPrice += priceDifference;
                yield updateOrder(orderID, order);
            }
        }
        else if (newQuantity < selectedItem.orderQuantity) {
            const diff = selectedItem.orderQuantity - newQuantity;
            food.availableQuantity += diff;
            yield updateFoodCount(food.foodID, food.availableQuantity);
            priceDifference += diff * Number(food.foodPrice);
            currentUser.balance += priceDifference;
            selectedItem.orderQuantity = newQuantity;
            selectedItem.orderPrice -= priceDifference;
            if (order) {
                order.totalPrice -= priceDifference;
                yield updateOrder(orderID, order);
            }
        }
        yield updateCartItem(selectedItem);
        yield orderHistory();
        alert("Order modified successfully!");
    });
}
