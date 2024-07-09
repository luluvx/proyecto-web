import { isAuthenticated, getUserInSession } from './utils.js';
import { inscribirUsuario, isUserEnrolled } from './inscription.js';

document.addEventListener("DOMContentLoaded", async function() {
    const courseTitleElement = document.querySelector('.course-title');
    const courseSubtitleElement = document.querySelector('.course-info-text h4');
    const courseDescriptionElement = document.querySelector('.course-info-text p');
    const courseImageElement = document.querySelector('.course-info-img img');
    const lessonsContainer = document.querySelector('.lessons');
    const lessonsErrorElement = document.getElementById('lessons-error'); // Elemento para mostrar errores
    const btnInscribirseElements = document.querySelectorAll('.btnInscribirse');
    const btnAbandonarCursoElements = document.querySelectorAll('.btnAbandonarCurso');
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!courseId) {
        console.error('No se proporcionó un ID de curso en la URL.');
        return;
    }

    await fetchCourseDetails(courseId);

    if (isAuthenticated()){
        const user = getUserInSession();
        const enrolled = await isUserEnrolled(user.id, courseId);
        if (enrolled) {
            btnInscribirseElements.forEach(button => {
                button.style.display = 'none';
            });
            btnAbandonarCursoElements.forEach(button => {
                button.style.display = 'block';
            });
        } else {
            btnInscribirseElements.forEach(button => {
                button.style.display = 'block';
            });
            btnAbandonarCursoElements.forEach(button => {
                button.style.display = 'none';
            });
        }
    }

    btnInscribirseElements.forEach(button => {
        button.addEventListener('click', handleInscription);
    });
    btnAbandonarCursoElements.forEach(button => {
        button.addEventListener('click', handleUnsubscribe);
    });

    async function fetchCourseDetails(courseId) {
        try {
            const response = await fetch(`http://localhost:3001/cursos/${courseId}/lecciones`);
            const course = await response.json();
            completeCourseDetails(course);
        } catch (error) {
            console.error('Error al obtener los detalles del curso con lecciones:', error);
            lessonsErrorElement.textContent = 'Error al obtener los detalles del curso. Intente nuevamente más tarde.';
            lessonsErrorElement.style.display = 'block';
        }
    }

    function completeCourseDetails(course) {
        courseTitleElement.textContent = course.nombre;
        courseSubtitleElement.textContent = course.pre_descripcion;
        courseDescriptionElement.textContent = course.descripcion;
        courseImageElement.src = `data:image/png;base64,${course.imagen_curso}`;

        if (course.lecciones.length === 0) {
            lessonsErrorElement.style.display = 'block';
        } else {
            lessonsErrorElement.style.display = 'none';
            course.lecciones.forEach(lesson => {
                const lessonElement = document.createElement('div');
                lessonElement.classList.add('lesson');
                lessonElement.innerHTML = `<h3>${lesson.orden}. ${lesson.tituloleccion}</h3>`;

                const lessonIcon = lesson.tipocontenido === 'video' ? 'fa-brands fa-youtube' : 'fa-solid fa-file-lines';
                lessonElement.innerHTML += `<a class="lessonType"><i class="${lessonIcon}"></i></a>`;

                lessonElement.addEventListener('click', () => handleLessonClick(lesson, course.id));

                lessonsContainer.appendChild(lessonElement);
            });
        }
    }

    function redirectLessonPage(lesson, courseId) {
        if (lesson.tipocontenido === 'video') {
            window.location.href=`../pages/video-lesson-view.html?lessonId=${lesson.id}`

        } else if (lesson.tipocontenido === 'texto'){
            window.location.href =`../pages/text-lesson-view.html?lessonId=${lesson.id}`;
        } else {
            console.error('Tipo de contenido no válido');
        }
    }

    async function handleLessonClick(lesson, courseId) {
        if (isAuthenticated()) {
            const user = getUserInSession();
            const enrolled = await isUserEnrolled(user.id, courseId);
            if (enrolled) {
                redirectLessonPage(lesson, courseId);
            } else {
                alert('Debes inscribirte en el curso para acceder a las lecciones.');
            }
        } else {
            window.location.href = `../../login-page.html`;
        }
    }

    async function handleInscription(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');

        if (!courseId) {
            console.error('No se proporcionó un ID de curso enla URL.');
            return;
        }

        if (isAuthenticated()) {
            const user = getUserInSession();
            const enrolled = await isUserEnrolled(user.id, courseId);
            if (enrolled) {
                alert('Ya estás inscrito en este curso.');
            } else {
                await inscribirUsuario(user.id, courseId);
                alert('Inscripción exitosa');
                location.reload(); // Recargar la página para actualizar el estado de inscripción
            }
        } else {
            window.location.href = `../../login-page.html`;
        }
    }
});
