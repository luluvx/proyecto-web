import { isAuthenticated, getUserInSession } from './utils.js';

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lessonId');
    const user = getUserInSession();

    if (!lessonId) {
        console.error('No se proporcionaron los IDs del curso o de la lección en la URL.');
        return;
    }

    if (!isAuthenticated()) {
        window.location.href = '../../login-page.html';
        return;
    }

    await loadTextLesson(lessonId);
    await createOrUpdateProgress(user.id, lessonId);


});
async function loadTextLesson(lessonId) {
    try {
        const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la información de la lección');
        }
        const lesson = await response.json();

        document.querySelector('.text-title').textContent = lesson.tituloleccion;
        document.querySelector('.text-description').textContent = lesson.descripcion;
        document.querySelector('.text-content').textContent = lesson.contenido;
    } catch (error) {
        console.error('Error al cargar la información de la lección de texto:', error);
    }
}
async function createOrUpdateProgress(userId, lessonId) {
    try {
        const response = await fetch('http://localhost:3001/progreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: userId, id_leccion: lessonId })
        });

        if (!response.ok) {
            throw new Error('Error al crear o actualizar el progreso');
        }
        const result = await response.json();
        console.log('Progreso creado o actualizado:', result);
    } catch (error) {
        console.error('Error al crear o actualizar el progreso:', error);
    }
}
