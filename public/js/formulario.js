document.addEventListener('DOMContentLoaded', () => {
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');

    const municipiosPorDepartamento = {
        "Alta Verapaz": ["Cahabon", "Chahal", "Chisec", "Coban", "Fray Bartolome de las Casas", "Lanquin", "Panzos", "Raxruha", "San Cristobal Verapaz", "San Juan Chamelco", "San Pedro Carcha", "Santa Catalina La Tinta", "Santa Cruz Verapaz", "Santa Maria Cahabon", "Senahu", "Tactic", "Tamahu", "Teleman", "Tucuru"],
        "Baja Verapaz": ["Cubulco", "Granados", "Purulha", "Rabinal", "Salamá", "San Jerónimo", "San Miguel Chicaj", "Santa Cruz El Chol"],
        "Chimaltenango": ["Acatenango", "Chimaltenango", "El Tejar", "Parramos", "Patzicia", "Patzun", "Pochuta", "San Andres Iztapa", "San Jose Poaquil", "San Juan Comalapa", "San Martin Jilotepeque", "San Pedro Yepocapa", "Santa Apolinia", "Santa Cruz Balaya", "Tecpan", "Zaragoza"],
        "Chiquimula": ["Chiquimula", "Esquipulas", "Jocotán", "Camotán", "Olopa"],
        "Guatemala": ["Guatemala", "Mixco", "Villa Nueva", "San Miguel Petapa", "Chinautla"],
        "Escuintla": ["Escuintla", "Santa Lucía Cotzumalguapa", "La Democracia", "Siquinalá", "Masagua"],
        "Huehuetenango": ["Huehuetenango", "Chiantla", "Malacatancito", "Cuilco", "Nentón"],
        "Izabal": ["Puerto Barrios", "Livingston", "El Estor", "Morales", "Los Amates"],
        "Jalapa": ["Jalapa", "San Pedro Pinula", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate"],
        "Jutiapa": ["Jutiapa", "El Progreso", "Santa Catarina Mita", "Agua Blanca", "Asunción Mita"],
        "Petén": ["Flores", "San Benito", "San Andrés", "La Libertad", "San Francisco"],
        "Quetzaltenango": ["Quetzaltenango", "Salcajá", "Olintepeque", "San Carlos Sija", "Sibilia"],
        "Quiché": ["Santa Cruz del Quiché", "Chichicastenango", "Zacualpa", "Chajul", "Chinique"],
        "Retalhuleu": ["Retalhuleu", "San Sebastián", "Santa Cruz Muluá", "San Martín Zapotitlán", "San Felipe"],
        "Sacatepéquez": ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santo Domingo Xenacoj"],
        "San Marcos": ["San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "Comitancillo", "Concepción Tutuapa"],
        "Santa Rosa": ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Casillas", "San Rafael Las Flores"],
        "Sololá": ["Sololá", "San José Chacayá", "Santa María Visitación", "Santa Lucía Utatlán", "Nahualá"],
        "Suchitepéquez": ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Ídolo"],
        "Totonicapán": ["Totonicapán", "San Cristóbal Totonicapán", "San Francisco El Alto", "San Andrés Xecul", "Momostenango"],
        "Zacapa": ["Zacapa", "Estanzuela", "Río Hondo", "Gualán", "Teculután"]
    };

    departamentoSelect.addEventListener('change', (event) => {
        const selectedDepartamento = event.target.value;
        const municipios = municipiosPorDepartamento[selectedDepartamento] || [];

        // Limpia las opciones actuales del menú desplegable de municipios
        municipioSelect.innerHTML = '<option value="">Seleccione un municipio</option>';

        // Añade las nuevas opciones de municipios
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio;
            option.textContent = municipio;
            municipioSelect.appendChild(option);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtén los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const departamento = document.getElementById('departamento').value;
        const municipio = document.getElementById('municipio').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const notas = document.getElementById('notas').value;

        // Obtén los artículos del carrito y el total final del almacenamiento local
        const carrito = JSON.parse(localStorage.getItem('cart')) || [];
        const totalFinal = localStorage.getItem('totalFinal') || 'Q0.00';

        // Construye la lista de artículos del carrito
        let listaArticulos = '';
        carrito.forEach(item => {
            listaArticulos += `\n- ${item.name}: ${item.quantity} x Q${item.price.toFixed(2)}`;
        });

        // Construye el mensaje de WhatsApp
        const mensaje = `Hola, me gustaría hacer un pedido con los siguientes datos:
        \nNombre: ${nombre}
        \nDepartamento: ${departamento}
        \nMunicipio: ${municipio}
        \nTeléfono: ${telefono}
        \nDirección: ${direccion}
        \nNotas u Observaciones: ${notas}
        \nMi pedido es: ${listaArticulos}
        \nTotal: ${totalFinal}`;

        // Construye la URL de WhatsApp
        const whatsappUrl = `https://wa.me/50239127199?text=${encodeURIComponent(mensaje)}`;

        // Abre la URL de WhatsApp en una nueva pestaña o ventana
        window.open(whatsappUrl, '_blank');

        // Borra el carrito del almacenamiento local
        localStorage.removeItem('cart');
        localStorage.removeItem('totalFinal');

        // Redirige a la página principal
        window.location.href = '/';
    });
});