function getMenu() {
  return fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    .then(response => response.json())
    .then(data => {
      const menuItems = document.getElementById('menu-items');
      data.forEach(item => {
        const row = document.createElement('tr');
        const itemName = document.createElement('td');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('td');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(itemName);
        row.appendChild(itemPrice);
        menuItems.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}


function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        "Classic Burger",
        "Cheese Burger",
        "Bacon Burger",
        "Veggie Burger",
        "Mushroom Swiss Burger",
      ];
      const order = {
        burger1: burgers[Math.floor(Math.random() * burgers.length)],
        burger2: burgers[Math.floor(Math.random() * burgers.length)],
        burger3: burgers[Math.floor(Math.random() * burgers.length)],
      };
      resolve(order);
    }, 2500);
  });
}


function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}


function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}


function thankyouFnc() {
  alert("Thank you for eating with us today!");
}


getMenu();


document.getElementById("order-btn").addEventListener("click", () => {
  takeOrder()
    .then((order) => {
      const orderContainer = document.getElementById("order");
      orderContainer.innerHTML = `
          <ul style="list-style-type: none; list-style-position: inside;">
            <li>${order.burger1}</li>
            <li>${order.burger2}</li>
            <li>${order.burger3}</li>
          </ul>
          <br>
        `;
      return orderPrep();
    })
    .then((status) => {
      const statusContainer = document.getElementById("status");
      statusContainer.innerHTML = `
          <br>
          <p>Order status: Preparing...</p>
        `;
      return payOrder();
    })
    .then((status) => {
      const statusContainer = document.getElementById("status");
      statusContainer.innerHTML = `
          <br>
          <p>Order status: Paid</p>
        `;
      thankyouFnc();
    })
    .catch((error) => console.log(error));
});