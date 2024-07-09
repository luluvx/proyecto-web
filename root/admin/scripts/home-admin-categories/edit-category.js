document.addEventListener("DOMContentLoaded", function() {
    const editModal = document.getElementById('editModal');
    const closeEditCategoryModalButton = editModal.querySelector('.close');
    const saveButton = editModal.querySelector('#saveButton');

    closeEditCategoryModalButton.addEventListener('click', closeEditCategoryModal);
    saveButton.addEventListener('click', handleSaveCategory);
});

let currentCategoryId = null;

export function openEditCategoryModal(categoryId) {
    currentCategoryId = categoryId;
    populateEditCategoryForm(categoryId);
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
}

export function closeEditCategoryModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}

function populateEditCategoryForm(categoryId) {
    const categoryNameInput = document.getElementById('categoryName');
    const categoryImageInput = document.getElementById('categoryImage');

    fetchCategoryDetails(categoryId)
        .then(category => {
            categoryNameInput.value = category.nombre;
            // No se establece el valor de la imagen aquí, ya que no se puede hacer programáticamente
        })
        .catch(error => {
            console.error('Error al obtener los detalles de la categoría:', error);
        });
}

function handleSaveCategory(event) {
    event.preventDefault();
    if (!validateEditCategoryForm()) {
        return;
    }
    saveUpdatedCategory();
}

async function fetchCategoryDetails(id) {
    const response = await fetch(`http://localhost:3001/categorias/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener la categoría');
    }
    return await response.json();
}

async function saveUpdatedCategory() {
    const categoryNameInput = document.getElementById('categoryName');
    const categoryImageInput = document.getElementById('categoryImage');

    const updatedName = categoryNameInput.value;
    const updatedImageFile = categoryImageInput.files[0];

    if (updatedImageFile) {
        try {
            const base64String = await toBase64(updatedImageFile);
            await updateCategory(currentCategoryId, updatedName, base64String);
            closeEditCategoryModal();
        } catch (error) {
            console.error('Error al convertir la imagen a base64:', error);
        }
    } else {
        await updateCategory(currentCategoryId, updatedName);
        closeEditCategoryModal();
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

async function updateCategory(id, nombre, imagen = null) {
    try {
        const body = { nombre };
        if (imagen) {
            body.imagen = imagen;
        }

        const response = await fetch(`http://localhost:3001/categorias/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la categoría');
        }

        const result = await response.json();
        console.log('Categoría actualizada:', result);
        window.location.reload();

    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
    }
}

function validateEditCategoryForm() {
    let isValid = true;

    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryImage = document.getElementById('categoryImage').files.length;
    const categoryNameError = document.getElementById('categoryNameError');
    const categoryImageError = document.getElementById('categoryImageError');

    if (!categoryName) {
        categoryNameError.style.display = 'block';
        isValid = false;
    } else {
        categoryNameError.style.display = 'none';
    }

    if (!categoryImage) {
        categoryImageError.style.display = 'block';
        isValid = false;
    } else {
        categoryImageError.style.display = 'none';
    }

    return isValid;
}
