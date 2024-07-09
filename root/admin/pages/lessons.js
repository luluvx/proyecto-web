// lesson.js
/*
export async function loadLessons(courseId) {
    const lessonsContainer = document.querySelector('.lessons');
    try {
        const response = await fetch(`http://localhost:3001/cursos/${courseId}/lecciones`);
        const lessons = await response.json();
        lessonsContainer.innerHTML = ''; // Limpiar el contenedor de lecciones antes de llenarlo
        lessons.forEach(lesson => {
            const lessonElement = createLessonElement(lesson);
            lessonsContainer.appendChild(lessonElement);
        });
    } catch (error) {
        console.error('Error al cargar las lecciones:', error);
    }
}

function createLessonElement(lesson) {
    const lessonElement = document.createElement('div');
    lessonElement.classList.add('lesson');

    const lessonTitle = document.createElement('div');
    lessonTitle.classList.add('lesson-title');
    const lessonTypeIcon = lesson.tipocontenido === 'video' ? 'fa-brands fa-youtube' : 'fa-solid fa-file-lines';
    lessonTitle.innerHTML = `<a class="lessonType"><i class="${lessonTypeIcon}"></i></a><h3>${lesson.tituloleccion}</h3>`;

    const lessonControls = document.createElement('div');
    lessonControls.classList.add('lesson-controls');
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.addEventListener('click', () => openLessonModal(lesson.id));
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => deleteLesson(lesson.id));

    lessonControls.appendChild(editButton);
    lessonControls.appendChild(deleteButton);

    lessonElement.appendChild(lessonTitle);
    lessonElement.appendChild(lessonControls);

    return lessonElement;
}

export async function addLesson(courseId) {
    const lessonTitleInput = document.querySelector('#addLessonTitle');
    const lessonTypeInput = document.querySelector('input[name="lessonType"]:checked');
    const lessonContentInput = document.querySelector('#addLessonContent');
    const lessonDescriptionInput = document.querySelector('#addLessonDescription');
    const lessonOrderInput = document.querySelector('#addLessonOrder');

    const lessonData = {
        id_curso: courseId,
        tituloleccion: lessonTitleInput.value,
        tipocontenido: lessonTypeInput.value,
        contenido: lessonContentInput.value,
        descripcion: lessonDescriptionInput.value,
        orden: lessonOrderInput.value
    };

    try {
        const response = await fetch(`http://localhost:3001/lecciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lessonData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const newLesson = await response.json();
        console.log('Lección añadida:', newLesson);
        const lessonElement = createLessonElement(newLesson);
        const lessonsContainer = document.querySelector('.lessons');
        lessonsContainer.appendChild(lessonElement);
        closeAddLessonModal();
    } catch (error) {
        console.error('Error al añadir la lección:', error);
    }
}

export async function deleteLesson(lessonId) {
    try {
        const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        console.log('Lección eliminada:', result);
        window.location.reload();
    } catch (error) {
        console.error('Error al eliminar la lección:', error);
    }
}

// Modal functions for lessons
/*
export function openAddLessonModal() {
    document.getElementById('addLessonModal').style.display = 'block';
}

export function closeAddLessonModal() {
    document.getElementById('addLessonModal').style.display = 'none';
}

export function openLessonModal(lessonId) {
    // Implementa la lógica para abrir el modal y cargar los datos de la lección
}
*/