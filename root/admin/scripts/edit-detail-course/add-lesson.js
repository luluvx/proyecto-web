// addLesson.js
document.addEventListener("DOMContentLoaded", function() {
    const addLessonModal = document.getElementById('addLessonModal');
    const openAddLessonModalButton = document.getElementById('btnAddLesson');
    const closeAddLessonModalButton = addLessonModal.querySelector('.close');
    const addLessonForm = addLessonModal.querySelector('.form-add-lesson');

    openAddLessonModalButton.addEventListener('click', openAddLessonModal);
    closeAddLessonModalButton.addEventListener('click', closeAddLessonModal);
    addLessonForm.addEventListener('submit', handleAddLesson);

    function openAddLessonModal() {
        addLessonModal.style.display = 'block';
    }

    function closeAddLessonModal() {
        addLessonModal.style.display = 'none';
    }

    async function handleAddLesson(event) {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');

        if (!courseId) {
            console.error('No se proporcionó un ID de curso en la URL.');
            return;
        }

        const formData = new FormData(addLessonForm);
        const lessonData = {
            id_curso: courseId,
            tituloLeccion: formData.get('lessonTitle'),
            tipoContenido: formData.get('lessonType'),
            contenido: formData.get('lessonContent'),
            descripcion: formData.get('lessonDescription'),
            orden: formData.get('lessonOrder')
        };

        try {
            const ordenesResponse = await fetch(`http://localhost:3001/lecciones/ordenes/${courseId}`);
            if (!ordenesResponse.ok) {
                console.error('Error al obtener los órdenes existentes.');
                alert('Error al validar el orden de la lección');
                return;
            }

            const ordenes = await ordenesResponse.json();
            const ordenesExistentes = ordenes.map(o => o.orden);

            // Verificar si el orden ya existe
            if (ordenesExistentes.includes(parseInt(lessonData.orden))) {
                alert('El orden de la lección ya existe. Por favor, ingresa un orden diferente.');
                return;
            }
        } catch (error) {
            console.error('Error al obtener los órdenes existentes:', error);
            alert('Error al validar el orden de la lección');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/lecciones', {
                method: 'POST',
                body: JSON.stringify(lessonData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Lección agregada exitosamente');
                closeAddLessonModal();
                location.reload(); // Recargar las lecciones
            } else {
                alert('Error al agregar la lección');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar la lección');
        }
    }
});
