document.addEventListener("DOMContentLoaded", function() {
    const editImageModal = document.getElementById('editImageModal');
    const openEditImageModalButton = document.querySelector('.btnEditImage');
    const closeEditImageModalButton = editImageModal.querySelector('.close');
    const editImageForm = editImageModal.querySelector('.form-edit-image');

    openEditImageModalButton.addEventListener('click', openEditImageModal);
    closeEditImageModalButton.addEventListener('click', closeEditImageModal);
    editImageForm.addEventListener('submit', handleEditImage);

    function openEditImageModal() {
        editImageModal.style.display = 'block';
    }

    function closeEditImageModal() {
        editImageModal.style.display = 'none';
    }

    async function handleEditImage(event) {
        event.preventDefault();
        const courseId = getCourseIdFromUrl();

        if (!courseId) {
            console.error('No se proporcionó un ID de curso en la URL.');
            return;
        }

        const courseImage = await getCourseImageFromForm();
        await updateCourseImage(courseId, courseImage);
    }

    function getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('courseId');
    }

    async function getCourseImageFromForm() {
        const formData = new FormData(editImageForm);
        const courseImage = formData.get('courseImage');
        return courseImage ? await toBase64(courseImage) : null;
    }

    async function updateCourseImage(courseId, courseImage) {
        try {
            const response = await fetch(`http://localhost:3001/cursos/${courseId}/imagen`, {
                method: 'PUT',
                body: JSON.stringify({ imagen_curso: courseImage }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Imagen del curso editada exitosamente');
                closeEditImageModal();
                window.location.reload();
            } else {
                alert('Error al editar la imagen del curso');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al editar la imagen del curso');
        }
    }

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }
});
