document.addEventListener("DOMContentLoaded", function() {
    const coursesContainer = document.querySelector('.course-section .container');
    if (!coursesContainer) {
        console.error('No se encontró el contenedor .courses-container .container en el DOM');
        return;
    }

    fetch('http://localhost:3001/cursos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(courses => {
            coursesContainer.innerHTML = ''; // Limpiar el contenedor de cursos antes de llenarlo
            courses.forEach(course => {
                const courseCard = createCourseCard(course);
                coursesContainer.appendChild(courseCard);
            });
        })
        .catch(error => console.error('Error al obtener los cursos:', error));

    function createCourseCard(course) {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        const courseImage = document.createElement('div');
        courseImage.classList.add('course-image');
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${course.imagen_curso}`;
        img.alt = `Imagen curso ${course.nombre}`;
        courseImage.appendChild(img);

        const courseInfo = document.createElement('div');
        courseInfo.classList.add('course-info');

        const courseTitle = document.createElement('h3');
        courseTitle.textContent = course.nombre;

        const courseControllers = document.createElement('div');
        courseControllers.classList.add('course-controllers');

        const editCourse = document.createElement('button');
        editCourse.innerHTML = 'Editar';
        editCourse.classList.add('edit-course');
        editCourse.addEventListener('click', () => editCourseAction(course.id));

        const deleteCourse = document.createElement('button');
        deleteCourse.innerHTML = 'Eliminar';
        deleteCourse.classList.add('delete-course');
        deleteCourse.addEventListener('click', () => deleteCourseAction(course.id));

        courseControllers.appendChild(editCourse);
        courseControllers.appendChild(deleteCourse);

        courseInfo.appendChild(courseTitle);
        courseInfo.appendChild(courseControllers);

        courseCard.appendChild(courseImage);
        courseCard.appendChild(courseInfo);

        return courseCard;
    }

    function editCourseAction(course_id) {
        window.location.href = `edit-detail-course.html?courseId=${course_id}`;
    }

    function deleteCourseAction(course_id) {
        fetch(`http://localhost:3001/cursos/${course_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Curso eliminado:', data);
                window.location.reload();
            })
            .catch(error => console.error('Error al eliminar el curso:', error));
    }
});
