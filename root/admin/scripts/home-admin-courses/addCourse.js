import { getUserInSession } from "../../../client/js/utils.js";

document.addEventListener("DOMContentLoaded", function() {
    loadCategories();

    const formAddCourse = document.querySelector('.form-add-course');
    const courseModal = document.getElementById('addCourseModal');
    const btnCloseModal = courseModal.querySelector('.close');
    const btnAddCourse = document.getElementById('btnAddCourse');

    formAddCourse.addEventListener('submit', async function(event) {
        event.preventDefault();
        if (validateAddCourseForm()) {
            await addCourse();
        }
    });

    btnAddCourse.addEventListener('click', openAddCourseModal);
    btnCloseModal.addEventListener('click', closeAddCourseModal);
});

function openAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'block';
}

function closeAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'none';
}

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3001/categorias');
        const categories = await response.json();

        const courseCategorySelect = document.querySelector('#courseCategory');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.nombre;
            courseCategorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }
}

async function addCourse() {
    const courseNameInput = document.querySelector('#courseName');
    const coursePreDescriptionInput = document.querySelector('#coursePreDescription');
    const courseDescriptionInput = document.querySelector('#courseDescription');
    const courseImageInput = document.querySelector('#courseImage');
    const courseCategorySelect = document.querySelector('#courseCategory');

    const nombre = courseNameInput.value;
    const pre_descripcion = coursePreDescriptionInput.value;
    const descripcion = courseDescriptionInput.value;
    const id_categoria = courseCategorySelect.value;
    let imagen_curso = null;

    if (courseImageInput.files[0]) {
        const file = courseImageInput.files[0];
        imagen_curso = await toBase64(file);
        imagen_curso = imagen_curso.split(',')[1]; // Eliminar metadata `data:image/png;base64,`
    }

    const user = getUserInSession();
    if (!user) {
        console.error('No se encontró un usuario en la sesión.');
        return;
    }

    const courseData = {
        nombre,
        pre_descripcion,
        descripcion,
        imagen_curso,
        id_categoria,
        id_usuario: user.id
    };

    // Mostrar datos que se envían para depuración
    console.log('Datos del curso a enviar:', courseData);

    try {
        const response = await fetch('http://localhost:3001/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Network response was not ok ' + response.statusText + ': ' + errorText);
        }

        const newCourse = await response.json();
        closeAddCourseModal();
        console.log('Curso añadido:', newCourse);
        window.location.reload();
    } catch (error) {
        console.error('Error al añadir el curso:', error);
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function validateAddCourseForm() {
    let isValid = true;

    const courseName = document.getElementById('courseName').value.trim();
    const coursePreDescription = document.getElementById('coursePreDescription').value.trim();
    const courseDescription = document.getElementById('courseDescription').value.trim();
    const courseImage = document.getElementById('courseImage').files.length;
    const courseCategory = document.getElementById('courseCategory').value;

    const courseNameError = document.getElementById('courseNameError');
    const coursePreDescriptionError = document.getElementById('coursePreDescriptionError');
    const courseDescriptionError = document.getElementById('courseDescriptionError');
    const courseImageError = document.getElementById('courseImageError');
    const courseCategoryError = document.getElementById('courseCategoryError');

    if (!courseName) {
        courseNameError.style.display = 'block';
        isValid = false;
    } else {
        courseNameError.style.display = 'none';
    }

    if (!coursePreDescription) {
        coursePreDescriptionError.style.display = 'block';
        isValid = false;
    } else {
        coursePreDescriptionError.style.display = 'none';
    }

    if (!courseDescription) {
        courseDescriptionError.style.display = 'block';
        isValid = false;
    } else {
        courseDescriptionError.style.display = 'none';
    }

    if (!courseImage) {
        courseImageError.style.display = 'block';
        isValid = false;
    } else {
        courseImageError.style.display = 'none';
    }

    if (!courseCategory) {
        courseCategoryError.style.display = 'block';
        isValid = false;
    } else {
        courseCategoryError.style.display = 'none';
    }

    return isValid;
}
