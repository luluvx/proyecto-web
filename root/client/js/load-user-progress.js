import { isAuthenticated, getUserInSession } from './utils.js';

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const userId = getUserInSession().id;

    console.log(`ID del curso obtenido de la URL: ${courseId}`);
    console.log(`ID del usuario obtenido de la sesión: ${userId}`);

    if (!courseId) {
        console.error('No se proporcionó un ID de curso en la URL.');
        return;
    }

    if (!isAuthenticated()) {
        console.log('El usuario no está autenticado. Redirigiendo a la página de inicio de sesión.');
        window.location.href = '../../login-page.html';
        return;
    }

    console.log('Cargando el progreso del usuario en el curso...');
    await loadUserProgress(userId, courseId);

    async function loadUserProgress(userId, courseId) {
        try {
            console.log(`Obteniendo el progreso del usuario ${userId} en el curso ${courseId} desde el servidor...`);
            const response = await fetch(`http://localhost:3001/progreso/usuario/${userId}/curso/${courseId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el progreso del usuario en el curso');
            }
            const { progress } = await response.json();
            console.log(`Progreso obtenido del servidor: ${progress}`);

            const progressElement = document.querySelector('.progress-section progress');
            console.log('Actualizando el elemento de progreso en la página...');
            progressElement.value = progress;
            console.log('El elemento de progreso en la página ha sido actualizado.');

        } catch (error) {
            console.error('Error al cargar el progreso del usuario en el curso:', error);
        }
    }
});