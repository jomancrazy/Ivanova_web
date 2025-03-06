document.addEventListener('DOMContentLoaded', () => {
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
            updateCartItems(cart, cartItems, null, cartCount, continueShoppingButton);
            window.location.reload(); // Recarga la página para actualizar el carrito
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    continueShoppingButton.addEventListener('click', () => {
        window.location.href = '/carrito'; // Redirige a la página carrito-compras.html
    });

    // Cargar los productos del carrito al cargar la página
    updateCartItems(cart, cartItems, null, cartCount, continueShoppingButton);
});