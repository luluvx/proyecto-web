// loadLessons.js

import {openEditLessonModal} from "./edit-lesson.js";

document.addEventListener("DOMContentLoaded", function() {
    const courseId = getCourseIdFromUrl(); // Implementa esta función para obtener el ID del curso de la URL
    loadLessons(courseId);
});

function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('courseId');
}

function loadLessons(courseId) {
    fetch(`http://localhost:3001/lecciones/curso/${courseId}`)
        .then(response => response.json())
        .then(data => {
            displayLessons(data);
        })
        .catch(error => console.error('Error al cargar las lecciones:', error));
}

function displayLessons(lessons) {
    const lessonsContainer = document.querySelector(".lessons");
    lessonsContainer.innerHTML = ""; // Limpiar contenido existente

    lessons.forEach(lesson => {
        const lessonElement = document.createElement("div");
        lessonElement.className = "lesson";

        const lessonInfo = document.createElement("div");
        lessonInfo.className = "lesson-info";

        const lessonType = document.createElement("a");
        lessonType.className = "lessonType";
        const icon = document.createElement("i");
        icon.className = lesson.tipocontenido === "video" ? "fa fa-video" : "fa fa-file-alt";
        lessonType.appendChild(icon);

        const lessonTitle = document.createElement("h3");
        lessonTitle.className = "lesson-title";
        lessonTitle.textContent = lesson.tituloleccion;

        lessonInfo.appendChild(lessonType);
        lessonInfo.appendChild(lessonTitle);

        const lessonControls = document.createElement("div");
        lessonControls.className = "lesson-controls";

        const btnEditLesson = document.createElement("button");
        btnEditLesson.className = "btnEditLesson";
        btnEditLesson.innerHTML = '<i class="fa fa-edit"></i>Editar';
        btnEditLesson.addEventListener("click", () => openEditLessonModal(lesson));


        const btnDeleteLesson = document.createElement("button");
        btnDeleteLesson.className = "btnDeleteLesson";
        btnDeleteLesson.innerHTML = '<i class="fa fa-trash"></i>Eliminar';
        btnDeleteLesson.addEventListener("click", () => deleteLesson(lesson.id));

        lessonControls.appendChild(btnEditLesson);
        lessonControls.appendChild(btnDeleteLesson);

        lessonElement.appendChild(lessonInfo);
        lessonElement.appendChild(lessonControls);

        lessonsContainer.appendChild(lessonElement);
    });
}



function deleteLesson(lessonId) {

    fetch(`http://localhost:3001/lecciones/${lessonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Lección eliminada exitosamente');
                const courseId = getCourseIdFromUrl();
                loadLessons(courseId);
            } else {
                alert('Error al eliminar la lección');
            }
        })
        .catch(error => console.error('Error al eliminar la lección:', error));
}

/*
document.addEventListener("DOMContentLoaded", function() {
    const lessonsContainer = document.querySelector('.lessons');
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!courseId) {
        console.error('No se proporcionó un ID de curso en la URL.');
        return;
    }

    fetchLessons(courseId);

    async function fetchLessons(courseId) {
        try {
            const response = await fetch(`http://localhost:3001/lecciones/curso/${courseId}`);
            const lessons = await response.json();
            completeLessons(lessons);
        } catch (error) {
            console.error('Error al obtener las lecciones:', error);
        }
    }

    function completeLessons(lessons) {
        lessonsContainer.innerHTML = ''; // Limpiar el contenedor antes de llenarlo

        lessons.forEach(lesson => {
            const lessonElement = document.createElement('div');
            lessonElement.classList.add('lesson');

            const lessonTitleElement = document.createElement('div');
            lessonTitleElement.classList.add('lesson-title');
            lessonTitleElement.innerHTML = `
                <a class="lessonType"><i class="${lesson.tipocontenido === 'video' ? 'fa-brands fa-youtube' : 'fa-solid fa-file-lines'}"></i></a>
                <h3>${lesson.tituloleccion}</h3>
            `;

            const lessonControlsElement = document.createElement('div');
            lessonControlsElement.classList.add('lesson-controls');
            lessonControlsElement.innerHTML = `
                <button class="btnEditLesson" data-lesson-id="${lesson.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btnDeleteLesson" data-lesson-id="${lesson.id}"><i class="fa-solid fa-trash"></i></button>
            `;

            lessonElement.appendChild(lessonTitleElement);
            lessonElement.appendChild(lessonControlsElement);
            lessonsContainer.appendChild(lessonElement);

            lessonControlsElement.querySelector('.btnEditLesson').addEventListener('click', () => editLesson(lesson.id));
            lessonControlsElement.querySelector('.btnDeleteLesson').addEventListener('click', deleteLesson);
        });
    }

    async function deleteLesson(event) {
        const lessonId = event.target.closest('.btnDeleteLesson').dataset.lessonId;
        const confirmed = confirm('¿Estás seguro de que deseas eliminar esta lección?');

        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Lección eliminada exitosamente');
                    fetchLessons(courseId);
                } else {
                    alert('Error al eliminar la lección');
                }
            } catch (error) {
                console.error('Error al eliminar la lección:', error);
                alert('Error al eliminar la lección');
            }
        }
    }

    async function editLesson(lessonId) {
        const editLessonModal = document.getElementById('editLessonModal');
        const lesson = await fetchLesson(lessonId);
        const editLessonForm = editLessonModal.querySelector('.form-edit-lesson');

        editLessonForm.lessonId.value = lesson.id;
        editLessonForm.lessonTitle.value = lesson.tituloleccion;
        editLessonForm.lessonDescription.value = lesson.descripcion;
        editLessonForm.lessonOrder.value = lesson.orden;
        editLessonForm.lessonType.value = lesson.tipocontenido;
        editLessonForm.lessonContent.value = lesson.contenido;

        if (lesson.tipocontenido === 'video') {
            document.getElementById('editTypeVideo').checked = true;
        } else {
            document.getElementById('editTypeText').checked = true;
        }

        editLessonModal.style.display = 'block';

        editLessonForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(editLessonForm);
            const lessonData = {
                id_curso: courseId,
                tituloLeccion: formData.get('lessonTitle'),
                descripcion: formData.get('lessonDescription'),
                orden: formData.get('lessonOrder'),
                tipocontenido: formData.get('lessonType'),
                contenido: formData.get('lessonContent')
            };

            try {
                const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`, {
                    method: 'PUT',
                    body: JSON.stringify(lessonData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Lección editada exitosamente');
                    editLessonModal.style.display = 'none';
                    fetchLessons(courseId); // Recargar las lecciones
                } else {
                    alert('Error al editar la lección');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al editar la lección');
            }
        }, { once: true });
    }

    async function fetchLesson(lessonId) {
        try {
            const response = await fetch(`http://localhost:3001/lecciones/${lessonId}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener la lección:', error);
            alert('Error al obtener la lección');
        }
    }
});*/
