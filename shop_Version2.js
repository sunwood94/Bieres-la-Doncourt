// Basic JS E-shop logic (no backend, demo only)
const products = [
  {
    name: "La Doncourt Blanche",
    desc: "Légère, agrumes, coriandre. 5,2%",
    price: 3.5,
    img: "clients/_1/_1/17684/images/produits/clients_produits58aeb254a4ea6.jpg"
  },
  {
    name: "La Doncourt Blondinette",
    desc: "Sèche, douce amertume. 5,2%",
    price: 3.5,
    img: "clients/_1/_1/17684/images/produits/clients_produits58aea6d0dca25.jpg"
  },
  {
    name: "La Doncourt IPA",
    desc: "Fruits, fleurs, amertume. 6,2%",
    price: 4.0,
    img: "clients/_1/_1/17684/images/produits/clients_produits58aeb1a6381e0.jpg"
  },
  {
    name: "La Doncourt Triple Blonde",
    desc: "Complexe, miel, agrumes. 8,0%",
    price: 4.2,
    img: "clients/_1/_1/17684/images/produits/clients_produits58aeae1baf51f.jpg"
  },
  {
    name: "La Doncourt Triple Dark",
    desc: "Ronde, cacao, caramel. 8,0%",
    price: 4.2,
    img: "clients/_1/_1/17684/images/produits/clients_produits58aeada02f9a3.jpg"
  }
];

// Render shop
const shopGrid = document.getElementById('shop-grid');
products.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'shop-product';
  el.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>${p.desc}</p>
    <div class="price">${p.price.toFixed(2)} €</div>
    <button onclick="addToCart(${i})">Ajouter</button>
  `;
  shopGrid.appendChild(el);
});

// Cart logic
let cart = [];
function addToCart(idx) {
  const prod = products[idx];
  const found = cart.find(item => item.idx === idx);
  if (found) found.qty += 1;
  else cart.push({idx, qty: 1});
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = 
    cart.reduce((a, c) => a + c.qty, 0);
}
function openCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Ton panier est vide !</p>';
  } else {
    cart.forEach(item => {
      const prod = products[item.idx];
      total += prod.price * item.qty;
      const d = document.createElement('div');
      d.innerHTML = `
        <b>${prod.name}</b> x${item.qty} 
        <span style="float:right;">${(prod.price * item.qty).toFixed(2)} €</span>
        <button onclick="removeOne(${item.idx})" style="margin-left:10px">-</button>
        <button onclick="addToCart(${item.idx})" style="margin-left:2px">+</button>
      `;
      d.style.marginBottom = "8px";
      cartItems.appendChild(d);
    });
  }
  document.getElementById('cart-total').textContent = total.toFixed(2) + " €";
  cartModal.classList.add('active');
}
function closeCart() {
  document.getElementById('cart-modal').classList.remove('active');
}
function removeOne(idx) {
  const it = cart.find(i => i.idx === idx);
  if (it) {
    it.qty -= 1;
    if (it.qty <= 0) cart = cart.filter(i => i.idx !== idx);
    updateCartCount();
    openCart();
  }
}
document.getElementById('cart-btn').onclick = openCart;
document.getElementById('close-cart').onclick = closeCart;
document.getElementById('checkout').onclick = () => {
  alert("Fonction de commande en ligne à venir ! Merci de votre intérêt 🍻");
  closeCart();
};
updateCartCount();