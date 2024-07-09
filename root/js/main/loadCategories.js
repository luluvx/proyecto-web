document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3001/categorias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Inspeccionar los datos recibidos

            const container = document.querySelector('.category-item-container');
            if (!container) {
                console.error('No se encontró el contenedor .category-item-container en el DOM');
                return;
            }

            container.innerHTML = ''; // Limpiar el contenedor

            data.forEach(category => {
                const item = document.createElement('div');
                item.classList.add('category-item');

                // Crear una URL de datos para la imagen en base64
                const imageUrl = `data:image/png;base64,${category.imagen}`;

                item.innerHTML = `
                    <img src="${imageUrl}" alt="Imagen categoria ${category.nombre}">
                    <h3>${category.nombre}</h3>
                `;
                item.addEventListener('click', () => {
                    window.location.href = `client/pages/home-unregistered-user.html?categoryId=${category.id}`;
                });
                container.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error al obtener las categorías:', error);
        });
});
