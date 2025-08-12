// Products array for the shop
const products = [
  {
    name: "La Doncourt IPA",
    desc: "Arômes fruités, fleurs, amertume soutenue. Alc. 6.5%",
    price: 4.0,
    img: "IPA-product.png"
  }
  // Ajoutez d'autres produits ici si besoin
];

function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  let found = cart.find(item => item.index === index);
  if (found) {
    found.qty++;
  } else {
    cart.push({ index, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  openCart();
}

function openCart() {
  document.getElementById('cartModal').classList.add('active');
  renderCart();
}

function closeCart() {
  document.getElementById('cartModal').classList.remove('active');
}

function checkout() {
  alert("Merci pour votre commande !");
  localStorage.removeItem('cart');
  renderCart();
  closeCart();
}

function renderShop() {
  const grid = document.getElementById('shopGrid');
  grid.innerHTML = '';
  products.forEach((product, i) => {
    grid.innerHTML += `
      <div class="shop-product">
        <img src="${product.img}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>${product.desc}</p>
        <div class="price">${product.price.toFixed(2)} €</div>
        <button onclick="addToCart(${i})">Ajouter</button>
      </div>
    `;
  });
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItems = document.getElementById('cart-items');
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Votre panier est vide</p>";
    document.getElementById('cart-total').innerHTML = "";
    return;
  }
  cartItems.innerHTML = cart.map(item => {
    const product = products[item.index];
    const subtotal = product.price * item.qty;
    total += subtotal;
    return `
      <div>
        <strong>${product.name}</strong> — ${item.qty} × ${product.price.toFixed(2)} € 
        <button onclick="removeFromCart(${item.index})" style="margin-left:1em;">Retirer</button>
      </div>
    `;
  }).join('');
  document.getElementById('cart-total').innerHTML = "Total : " + total.toFixed(2) + " €";
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const found = cart.find(item => item.index === index);
  if (found) {
    found.qty--;
    if (found.qty <= 0) {
      cart = cart.filter(item => item.index !== index);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Render shop on page load
document.addEventListener('DOMContentLoaded', renderShop);
