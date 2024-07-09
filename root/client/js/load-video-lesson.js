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

    await loadVideoLesson(lessonId);
    await createOrUpdateProgress(user.id, lessonId);
});

async function loadVideoLesson(lessonId) {
    try {
        const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la información de la lección');
        }
        const lesson = await response.json();

        if (!lesson.contenido) {
            throw new Error('La URL del video no está definida');
        }

        document.querySelector('.video-title h2').textContent = lesson.tituloleccion;
        document.querySelector('.video-description p').textContent = lesson.descripcion;
        processVideoId(lesson.contenido);
    } catch (error) {
        console.error('Error al cargar la información de la lección de video:', error);
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

function processVideoId(url) {
    const videoId = getVideoId(url);
    if (!videoId) {
        alert("La URL ingresada es inválida");
        return;
    }


    const iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

    document.querySelector(".video-container iframe").src = `https://www.youtube.com/embed/${videoId}`;
}

function getVideoId(url) {
    const videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    console.log(JSON.stringify(videoid));
    if (videoid != null)
        return videoid[1];
    return null;
}
