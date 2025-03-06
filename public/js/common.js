// Variables comunes
let cart = loadCart();
let cartCount = document.getElementById('cart-count');
let cartSidebar = document.getElementById('cart-sidebar');
let cartItems = document.getElementById('cart-items');
let closeCartButton = document.getElementById('close-cart');
let iconButton = document.getElementById('icon-button');
let continueShoppingButton = document.getElementById('continue-shopping');
let header = document.querySelector('header');


// Función para manejar la apertura y cierre del carrito de compras
function handleCartSidebar() {
    if (iconButton && cartSidebar && closeCartButton) {
        iconButton.addEventListener('click', () => {
            cartSidebar.classList.toggle('open');
            updateCartItems(cart, cartItems, document.getElementById('cart-total-sidebar'), cartCount, continueShoppingButton);
        });

        closeCartButton.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }
}

// Función para cargar el encabezado
function loadHeader() {
    fetch('/header')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // Reasignar variables después de cargar el encabezado
            cartCount = document.getElementById('cart-count');
            cartSidebar = document.getElementById('cart-sidebar');
            cartItems = document.getElementById('cart-items');
            closeCartButton = document.getElementById('close-cart');
            iconButton = document.getElementById('icon-button');
            continueShoppingButton = document.getElementById('continue-shopping');
            handleCartSidebar(); // Llama a la función para manejar la apertura y cierre del carrito de compras
            updateCartCount(); // Actualiza el contador del carrito al cargar el encabezado
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    if (cartCount) {
        cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

// Llama a la función para cargar el encabezado y manejar la apertura y cierre del carrito de compras
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
});

// Función para actualizar los elementos del carrito
function updateCartItems(cart, cartItemsElement, cartTotalElement, cartCountElement, continueShoppingButton) {
    cartItemsElement.innerHTML = '';
    if (cartTotalElement) cartTotalElement.innerHTML = '';
    let total = 0;
    let shippingCost = 0;
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li>No hay productos en el carrito.</li>';
        if (continueShoppingButton) continueShoppingButton.style.display = 'none';
    } else {
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <span>${product.name}</span>
                    <span>x${product.quantity} - Q${(product.price * product.quantity).toFixed(2)}</span>
                </div>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsElement.appendChild(li);
            total += product.price * product.quantity;
        });

        if (total < 150) {
            shippingCost = 40;
        } else {
            shippingCost = 30.50;
        }

        total += shippingCost;

        if (cartTotalElement) {
            cartTotalElement.innerHTML = `
                <p>Envío: Q${shippingCost.toFixed(2)}</p>
                <p>Total: Q${total.toFixed(2)}</p>
            `;
        }

        if (continueShoppingButton) continueShoppingButton.style.display = 'block';
    }

    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

// Función para eliminar una unidad de un producto del carrito
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart[index];
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart.splice(index, 1); // Elimina el producto del carrito si solo hay una unidad
    }
    saveCart(cart); // Guarda el carrito actualizado en localStorage
    updateCartItems(cart, document.getElementById('cart-items'), document.getElementById('cart-total-sidebar'), document.getElementById('cart-count'), document.getElementById('continue-shopping'));
    updateCartCount(); // Actualiza el contador del carrito
    window.location.reload(); // Recarga la página para actualizar el carrito
}

// Función para cargar el carrito desde localStorage
function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}