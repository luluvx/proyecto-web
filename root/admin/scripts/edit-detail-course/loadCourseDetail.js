// loadCourseDetails.js

document.addEventListener("DOMContentLoaded", async function() {
    const courseTitleElement = document.querySelector('.course-title');
    const courseSubtitleElement = document.querySelector('.course-info-text h4');
    const courseDescriptionElement = document.querySelector('.course-info-text p');
    const courseImageElement = document.querySelector('.course-info-img img');

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!courseId) {
        console.error('No se proporcionó un ID de curso en la URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/cursos/${courseId}`);
        const course = await response.json();
        completeCourseDetails(course);
    } catch (error) {
        console.error('Error al obtener los detalles del curso:', error);
    }

    function completeCourseDetails(course) {
        courseTitleElement.textContent = course.nombre;
        courseSubtitleElement.textContent = course.pre_descripcion;
        courseDescriptionElement.textContent = course.descripcion;
        courseImageElement.src = `data:image/png;base64,${course.imagen_curso}`;
    }
});
