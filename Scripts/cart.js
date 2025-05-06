const cartItemsContainer = document.querySelector(".cartItems"); // car items go here
const totalElement = document.querySelector(".cartSummary h3");   // total price

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "Total: $0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";

  cart.forEach(car => {
    cartItemsContainer.innerHTML += `
      <div class="cartItem">
        <img src="${car.image}" alt="${car.name}">
        <div class="itemDetails">
          <h2>${car.name}</h2>
          <p>$${car.price.toFixed(2)}</p>
        </div>
        <button class="removeBtn" onclick='removeFromCart("${car.name}")'>Remove</button>
      </div>
    `;
  });

  updateTotal(cart);
}

function updateTotal(cart) {
  const total = cart.reduce((sum, car) => sum + car.price, 0);
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(carName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(car => car.name !== carName);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Reload cart and total
}

// Load when page loads
loadCart();
