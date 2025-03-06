document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');
    const cart = loadCart();

    try {
        const response = await fetch('/products/ivanova/category/pinceles%20ivanova'); // Cambiado a la ruta correcta
        const products = await response.json();
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="http://localhost:3000/products/image/${product.image.split('/').pop()}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Q${product.price}</p>
                <button class="add-to-cart">Añadir</button>
            `;
            productGrid.appendChild(productItem);
        });

        // Añadir eventos a los botones de agregar al carrito
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productItem = event.target.closest('.product-item');
                const productName = productItem.querySelector('h3').innerText;
                const productPrice = parseFloat(productItem.querySelector('p').innerText.replace('Q', ''));
                const productImage = productItem.querySelector('img').src;

                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };

                const existingProduct = cart.find(item => item.name === productName);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push(product);
                }

                saveCart(cart);
                updateCartCount(); // Actualiza el contador del carrito en tiempo real
                updateCartItems(cart, document.getElementById('cart-items'), document.getElementById('cart-total-sidebar'), document.getElementById('cart-count'), document.getElementById('continue-shopping'));
                window.location.reload(); // Recarga la página para actualizar el carrito
            });
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
});