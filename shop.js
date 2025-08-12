// Products array with all main beers from the original website
const products = [
  {
    name: "La Doncourt IPA",
    desc: "Notre IPA associe une robe cuivrée intense à un taux d'alcool modéré (6,5%). Sa mousse est abondante et persistante. Elle s’apprécie d’abord au nez par le développement puissant d’arômes fruités et de fleurs. Passés les premiers arômes fleuris, elle dérive progressivement vers une amertume soutenue qui persistera longtemps en bouche. Disponible en 33cl ou 75cl.",
    price: 4.0,
    img: "IPA-product.png"
  },
  {
    name: "La Doncourt Blanche",
    desc: "Notre blanche se caractérise par une robe mimosa pâle naturellement troublée grâce à l’emploi de malt de froment. Légère, désaltérante, elle associe un subtil goût d'agrumes (citron, orange et pamplemousse) et de coriandre. Titrant un faible taux d'alcool (5,2%), cette blanche est idéale pour vous rafraîchir les jours d’été ! Disponible en 33cl ou 75cl.",
    price: 3.7,
    img: "BLANCHE-product.png"
  },
  {
    name: "La Doncourt Blondinette",
    desc: "D'un agréable jaune d'or, notre blondinette titre 5,2% d’alcool. Cette bière est sèche et légèrement amère. Elle révèle des saveurs plaisantes de malt ainsi qu’une pointe d'acidité. Une bière parfaite pour les amateurs de blondes peu houblonnées ! Disponible en 33cl ou 75cl.",
    price: 3.7,
    img: "BLONDINETTE-product.png"
  },
  {
    name: "La Doncourt Triple Blonde",
    desc: "Notre triple blonde est une bière complexe et bien trempée, dotée d’une robe miel. Elle développe en bouche une légère amertume ainsi que des arômes d’agrumes et de bois. Avec un taux d'alcool de 8%, elle ravira les amateurs de bières de caractère ! Disponible en 33cl ou 75cl.",
    price: 4.5,
    img: "TRIPLE-BLONDE-product.png"
  },
  {
    name: "La Doncourt Triple Dark",
    desc: "La robe de notre Triple Dark est d’un sombre profond et annonce directement la couleur. Grâce aux grains torréfiés, elle mélange des arômes de cacao, de caramel et de café. Cette bière ronde en bouche est peu amère et offre une dégustation facile malgré ses 8% d'alcool. Disponible en 33cl ou 75cl.",
    price: 4.5,
    img: "TRIPLE-DARK-product.png"
  }
];

// Modal logic
let currentModalProduct = 0;
function openProductModal(index) {
  currentModalProduct = index;
  const p = products[index];
  document.getElementById('modalProductImg').src = p.img;
  document.getElementById('modalProductImg').alt = p.name;
  document.getElementById('modalProductName').textContent = p.name;
  document.getElementById('modalProductDesc').textContent = p.desc;
  document.getElementById('modalProductPrice').textContent = p.price.toFixed(2) + " €";
  document.getElementById('modalProductQty').value = 1;
  document.getElementById('productModal').classList.add('active');
}
document.getElementById('closeProductModal').onclick = function() {
  document.getElementById('productModal').classList.remove('active');
};
// For clicking outside modal-content
document.getElementById('productModal').onclick = function(e) {
  if (e.target === this) this.classList.remove('active');
};
// Add to cart from modal
document.getElementById('modalAddToCart').onclick = function() {
  const qty = parseInt(document.getElementById('modalProductQty').value, 10);
  addToCart(currentModalProduct, qty);
  document.getElementById('productModal').classList.remove('active');
};

// Cart functions
function addToCart(index, qty = 1) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  let found = cart.find(item => item.index === index);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ index, qty });
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

// No need to render a grid, products are statically in HTML
// (Keep this comment for clarity)
