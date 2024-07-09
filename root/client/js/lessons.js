/*import { isAuthenticated, getUserInSession } from '../../js/utils.js';
import { isUserEnrolled } from './inscription.js';

document.addEventListener("DOMContentLoaded", async function() {
    const lessonsContainer = document.querySelector('.lessons');
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!courseId) {
        console.error('No se proporcionó un ID de curso en la URL.');
        return;
    }

    await fetchLessons(courseId);
});

async function fetchLessons(courseId) {
    try {
        const response = await fetch(`http://localhost:3001/lecciones/${courseId}`);
        const lessons = await response.json();
        populateLessons(lessons, courseId);
    } catch (error) {
        console.error('Error al obtener las lecciones del curso:', error);
    }
}

function populateLessons(lessons, courseId) {
    const lessonsContainer = document.querySelector('.lessons');

    lessons.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.classList.add('lesson');

        const lessonTitle = document.createElement('h3');
        lessonTitle.classList.add('lesson-title');
        lessonTitle.textContent = `${lesson.orden}. ${lesson.tituloleccion}`;

        const lessonType = document.createElement('a');
        lessonType.classList.add('lesson-type');

        const lessonIcon = document.createElement('i');
        lessonIcon.className = getLessonIcon(lesson.tipoContenido);
        lessonType.appendChild(lessonIcon);

        lessonElement.appendChild(lessonTitle);
        lessonElement.appendChild(lessonType);

        lessonElement.addEventListener('click', () => handleLessonClick(lesson, courseId));

        lessonsContainer.appendChild(lessonElement);
    });
}

function getLessonIcon(tipoContenido) {
    return tipoContenido === 'video' ? 'fa-brands fa-youtube' : 'fa-solid fa-file-lines';
}

async function handleLessonClick(lesson, courseId) {
    if (isAuthenticated()) {
        const user = getUserInSession();
        const enrolled = await isUserEnrolled(user.id, courseId);
        if (enrolled) {
            const lessonViewPage = lesson.tipoContenido === 'video' ? 'video-lesson-view.html' : 'text-lesson-view.html';
            window.location.href = `${lessonViewPage}?lessonId=${lesson.id}`;
        } else {
            alert('Debes inscribirte en el curso para acceder a las lecciones.');
        }
    } else {
        window.location.href = `../../login-page.html`;
    }
}
*/