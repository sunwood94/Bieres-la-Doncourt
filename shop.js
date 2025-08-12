let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

document.getElementById('cart-toggle').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.toggle('open');
});

function checkout() {
  alert('Checkout not implemented yet. Stay tuned!');
}
