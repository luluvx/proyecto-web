import { loadCoursesByCategory } from "./courses.js";

export function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');

    fetch('http://localhost:3001/categorias')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.classList.add('categorie-course-item');

                const categoryImage = document.createElement('img');
                categoryImage.src = `data:image/png;base64,${category.imagen}`;
                categoryImage.alt = `Imagen categoria ${category.nombre}`;

                const categoryName = document.createElement('h3');
                categoryName.textContent = category.nombre;

                categoryItem.appendChild(categoryImage);
                categoryItem.appendChild(categoryName);

                categoryItem.addEventListener('click', () => {
                    loadCoursesByCategory(category.id);
                });

                categoriesContainer.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error al obtener las categorías:', error));
}
