// load-user-courses.js
import { isAuthenticated, getUserInSession } from './utils.js';

document.addEventListener('DOMContentLoaded', async function() {
    const coursesContainer = document.querySelector('.courses');

    if (isAuthenticated()) {
        const user = getUserInSession();
        await fetchUserCourses(user.id);
    } else {
        window.location.href = '../../login-page.html';
    }

    async function fetchUserCourses(userId) {
        try {
            const response = await fetch(`http://localhost:3001/usuario/${userId}/cursos`);
            if (!response.ok) {
                throw new Error('Error al obtener los cursos del usuario');
            }
            const courses = await response.json();
            displayUserCourses(courses);
        } catch (error) {
            console.error('Error al obtener los cursos del usuario:', error);
        }
    }

    function displayUserCourses(courses) {
        coursesContainer.innerHTML = ''; // Limpiar el contenedor antes de llenarlo

        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course-item');

            courseElement.innerHTML = `
                <img src="data:image/png;base64,${course.imagen_curso}" alt="Imagen curso ${course.nombre}">
                <h3 class="course-title">${course.nombre}</h3>
                
            `;

            courseElement.addEventListener('click', () => {
                window.location.href = `detail-course-registered-user.html?courseId=${course.id}`;
            });

            coursesContainer.appendChild(courseElement);
        });
    }
});
