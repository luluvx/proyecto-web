let currentLessonId = null;

document.addEventListener("DOMContentLoaded", function() {
    const editLessonModal = document.getElementById('editLessonModal');
    const closeEditLessonModalButton = editLessonModal.querySelector('.close');
    const formEditLesson = document.querySelector(".form-edit-lesson");

    closeEditLessonModalButton.addEventListener('click', closeEditLessonModal);
    formEditLesson.addEventListener('submit', handleEditLesson);
});

export function openEditLessonModal(lesson) {
    currentLessonId = lesson.id; // Guardar la ID de la lección en una variable global
    completeEditLessonForm(lesson);
    const editLessonModal = document.getElementById('editLessonModal');
    editLessonModal.style.display = 'block';
}

export function closeEditLessonModal() {
    const editLessonModal = document.getElementById('editLessonModal');
    editLessonModal.style.display = 'none';
}

function completeEditLessonForm(lesson) {
    document.getElementById("lessonTitle").value = lesson.tituloleccion;
    document.getElementById("lessonDescription").value = lesson.descripcion;
    document.getElementById("lessonOrder").value = lesson.orden;
    if (lesson.tipocontenido === 'video') {
        document.getElementById("editTypeVideo").checked = true;
    } else {
        document.getElementById("editTypeText").checked = true;
    }
    document.getElementById("lessonContent").value = lesson.contenido;
}

function handleEditLesson(event) {
    event.preventDefault();
    saveEditedLesson();
}

async function saveEditedLesson() {
    const lessonTitle = document.getElementById("lessonTitle").value;
    const lessonDescription = document.getElementById("lessonDescription").value;
    const lessonOrder = document.getElementById("lessonOrder").value;
    const lessonType = document.querySelector("input[name='lessonType']:checked").value;
    const lessonContent = document.getElementById("lessonContent").value;

    const lessonData = {
        tituloLeccion: lessonTitle,
        descripcion: lessonDescription,
        orden: lessonOrder,
        tipoContenido: lessonType,
        contenido: lessonContent
    };

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');
        if (!courseId) {
            console.error('No se proporcionó un ID de curso en la URL.');
            return;
        }

        const ordenesResponse = await fetch(`http://localhost:3001/lecciones/ordenes/${courseId}`);
        if (!ordenesResponse.ok) {
            console.error('Error al obtener los órdenes existentes.');
            alert('Error al validar el orden de la lección');
            return;
        }

        const ordenes = await ordenesResponse.json();
        const ordenesExistentes = ordenes.map(o => o.orden);

        if (ordenesExistentes.includes(parseInt(lessonOrder)) && lessonOrder != document.getElementById("lessonOrder").dataset.originalOrder) {
            alert('El orden de la lección ya existe. Por favor, ingresa un orden diferente.');
            return;
        }
    } catch (error) {
        console.error('Error al obtener los órdenes existentes:', error);
        alert('Error al validar el orden de la lección');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/lecciones/${currentLessonId}`, { // Usar la variable global
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lessonData)
        });

        if (!response.ok) {
            throw new Error('Error al guardar la lección editada');
        }

        const data = await response.json();
        console.log('Lección actualizada:', data);
        closeEditLessonModal();
        window.location.reload();
    } catch (error) {
        console.error('Error al guardar la lección editada:', error);
    }
}
