document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/header')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Añadir eventos del dropdown después de cargar el header
            const dropdown = document.querySelector('.dropdown');
            const dropdownContent = document.querySelector('.dropdown-content');

            if (dropdown && dropdownContent) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdownContent.style.display = 'block';
                });

                dropdown.addEventListener('mouseleave', () => {
                    dropdownContent.style.display = 'none';
                });
            }
        })
        .catch(error => console.error('Error al cargar el header:', error));
});
