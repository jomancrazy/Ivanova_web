document.addEventListener('DOMContentLoaded', () => {
    // Las variables y funciones ya están definidas en common.js

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Cargar los productos del carrito en la página carrito-compras.html
    const cart = loadCart();
    updateCartItems(cart, document.getElementById('cart-items'), document.getElementById('cart-total'), document.getElementById('cart-count'));
    updateCartCount(); // Actualiza el contador del carrito al cargar la página
});

// Función para actualizar los elementos del carrito
function updateCartItems(cart, cartItemsElement, cartTotalElement, cartCountElement) {
    cartItemsElement.innerHTML = '';
    if (cartTotalElement) cartTotalElement.innerHTML = '';
    let total = 0;
    let shippingCost = 0;
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="6">No hay productos en el carrito.</td></tr>';
    } else {
        cart.forEach((product, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>Q${product.price.toFixed(2)}</td>
                <td>Q${(product.price * product.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
            `;
            cartItemsElement.appendChild(tr);
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
    }

    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Guarda el carrito y el total final en localStorage
    saveCart(cart);
    localStorage.setItem('totalFinal', `Q${total.toFixed(2)}`);
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
    updateCartItems(cart, document.getElementById('cart-items'), document.getElementById('cart-total'), document.getElementById('cart-count'));
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

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', () => {
        window.location.href = '/formulario'; // Redirige a la página del formulario
    });

    // Cargar y actualizar el carrito al cargar la página
    const cart = loadCart();
    updateCartItems(cart, document.getElementById('cart-items'), document.getElementById('cart-total'), document.getElementById('cart-count'));
});