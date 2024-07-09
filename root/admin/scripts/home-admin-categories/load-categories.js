// load-categories.js
import { deleteCategory } from './delete-category.js';
import { openEditCategoryModal } from './edit-category.js';

document.addEventListener("DOMContentLoaded", function() {
    const categoriesContainer = document.querySelector('.category-section .container');
    fetchCategories();

    document.addEventListener('categoriesUpdated', fetchCategories);

    async function fetchCategories() {
        try {
            const response = await fetch('http://localhost:3001/categorias');
            const categories = await response.json();
            completeCategories(categories);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    }

    function completeCategories(categories) {
        categoriesContainer.innerHTML = ''; // Limpiar el contenedor antes de llenarlo

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('category-card');

            categoryElement.innerHTML = `
                <div class="category-image">
                    <img src="data:image/png;base64,${category.imagen}">
                </div>
                <div class="category-info">
                    <h3 class="categoryName">${category.nombre}</h3>
                    <div class="category-controlers">
                        <button class="btnEditCategory" data-category-id="${category.id}">Editar</button>
                        <button class="btnDeleteCategory" data-category-id="${category.id}">Eliminar</button>
                    </div>
                </div>
            `;

            categoriesContainer.appendChild(categoryElement);
        });

        document.querySelectorAll('.btnEditCategory').forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category-id');
                openEditCategoryModal(categoryId);
            });
        });

        document.querySelectorAll('.btnDeleteCategory').forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category-id');
                deleteCategory(categoryId);
            });
        });
    }
});
