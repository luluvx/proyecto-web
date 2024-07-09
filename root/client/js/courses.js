import { isAuthenticated, getUserInSession } from './utils.js';

export function loadCourses(courses) {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ''; // Limpiar el contenedor de cursos antes de llenarlo

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        const courseImage = document.createElement('img');
        courseImage.src = `data:image/png;base64,${course.imagen_curso}`;
        courseImage.alt = `Imagen curso ${course.nombre}`;

        const courseName = document.createElement('h3');
        courseName.textContent = course.nombre;

        courseItem.appendChild(courseImage);
        courseItem.appendChild(courseName);

        courseItem.addEventListener('click', () => {
            if (isAuthenticated()) {
                window.location.href = `../pages/detail-course-registered-user.html?courseId=${course.id}`;
            } else {
                window.location.href = `../pages/detail-course-unregistered-user.html?courseId=${course.id}`;
            }
        });

        coursesContainer.appendChild(courseItem);
    });
}

export function loadCoursesByCategory(categoryId) {
    fetch(`http://localhost:3001/categorias/${categoryId}/cursos`)
        .then(response => response.json())
        .then(data => {
            loadCourses(data.cursos);
        })
        .catch(error => console.error('Error al obtener los cursos:', error));
}

export function loadAllCourses() {
    fetch('http://localhost:3001/cursos')
        .then(response => response.json())
        .then(courses => {
            loadCourses(courses);
        })
        .catch(error => console.error('Error al obtener los cursos:', error));
}
