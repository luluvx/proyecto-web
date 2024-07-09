// add-category.js

document.addEventListener("DOMContentLoaded", function() {
    const addCategoryModal = document.getElementById('addCategoryModal');
    const openAddCategoryModalButton = document.getElementById('btnAddCategory');
    const closeAddCategoryModalButton = addCategoryModal.querySelector('.close');
    const addCategoryForm = addCategoryModal.querySelector('.form-add-category');

    openAddCategoryModalButton.addEventListener('click', openAddCategoryModal);
    closeAddCategoryModalButton.addEventListener('click', closeAddCategoryModal);
    addCategoryForm.addEventListener('submit', handleAddCategory);

    function openAddCategoryModal() {
        addCategoryModal.style.display = 'block';
    }

    function closeAddCategoryModal() {
        addCategoryModal.style.display = 'none';
    }

    async function handleAddCategory(event) {
        event.preventDefault();
        if (!validateAddCategoryForm()) {
            return;
        }
        const formData = new FormData(addCategoryForm);
        const categoryData = {
            nombre: formData.get('newCategoryName'),
            imagen: await convertToBase64(formData.get('newCategoryImage'))
        };

        try {
            const response = await fetch('http://localhost:3001/categorias', {
                method: 'POST',
                body: JSON.stringify(categoryData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Categoría agregada exitosamente');
                closeAddCategoryModal();
                location.reload();
            } else {
                alert('Error al agregar la categoría');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar la categoría');
        }
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.replace(/^data:image\/(png|jpeg);base64,/, ''));
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
});

// Funciones de validación
function validateAddCategoryForm() {
    let isValid = true;

    const newCategoryName = document.getElementById('newCategoryName').value.trim();
    const newCategoryImage = document.getElementById('newCategoryImage').files.length;
    const newCategoryNameError = document.getElementById('newCategoryNameError');
    const newCategoryImageError = document.getElementById('newCategoryImageError');

    if (!newCategoryName) {
        newCategoryNameError.style.display = 'block';
        isValid = false;
    } else {
        newCategoryNameError.style.display = 'none';
    }

    if (!newCategoryImage) {
        newCategoryImageError.style.display = 'block';
        isValid = false;
    } else {
        newCategoryImageError.style.display = 'none';
    }

    return isValid;
}

