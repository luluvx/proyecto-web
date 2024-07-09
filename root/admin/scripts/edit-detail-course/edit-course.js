// editCourse.js

document.addEventListener("DOMContentLoaded", function() {
    const editCourseModal = document.getElementById('editCourseModal');
    const openEditCourseModalButton = document.querySelector('.btnEditCourse');
    const closeEditCourseModalButton = editCourseModal.querySelector('.close');
    const editCourseForm = editCourseModal.querySelector('.form-edit-course');

    openEditCourseModalButton.addEventListener('click', openEditCourseModal);
    closeEditCourseModalButton.addEventListener('click', closeEditCourseModal);
    editCourseForm.addEventListener('submit', handleEditCourse);

    function openEditCourseModal() {
        completeEditForm();
        editCourseModal.style.display = 'block';
    }

    function closeEditCourseModal() {
        editCourseModal.style.display = 'none';
    }

    async function handleEditCourse(event) {
        event.preventDefault();
        const courseId = getCourseIdFromUrl();

        if (!courseId) {
            console.error('No se proporcionó un ID de curso en la URL.');
            return;
        }

        const courseData = getCourseDataFromForm();
        await updateCourse(courseId, courseData);
    }

    function completeEditForm() {
        const courseTitle = document.querySelector('.course-title').textContent;
        const courseSubtitle = document.querySelector('.course-info-text h4').textContent;
        const courseDescription = document.querySelector('.course-info-text p').textContent;

        editCourseForm.courseName.value = courseTitle;
        editCourseForm.coursePreDescription.value = courseSubtitle;
        editCourseForm.courseDescription.value = courseDescription;
    }

    function getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('courseId');
    }

    function getCourseDataFromForm() {
        const formData = new FormData(editCourseForm);
        return {
            nombre: formData.get('courseName'),
            pre_descripcion: formData.get('coursePreDescription'),
            descripcion: formData.get('courseDescription')
        };
    }

    async function updateCourse(courseId, courseData) {
        try {
            const response = await fetch(`http://localhost:3001/cursos/${courseId}`, {
                method: 'PUT',
                body: JSON.stringify(courseData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Curso editado exitosamente');
                closeEditCourseModal();
                window.location.reload();
            } else {
                alert('Error al editar el curso');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al editar el curso');
        }
    }
});
