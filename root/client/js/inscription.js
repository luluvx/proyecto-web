export async function inscribirUsuario(id_usuario, id_curso) {
    try {
        const response = await fetch('http://localhost:3001/inscripcion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, id_curso }),
        });


        if (!response.ok) {
            throw new Error('Error al inscribir al usuario');
        }

        const inscripcion = await response.json();
        console.log('Inscripción exitosa:', inscripcion);
    } catch (error) {
        console.error('Error al inscribir al usuario:', error);
    }
}
export async function isUserEnrolled(id_usuario, id_curso) {
    try {
        const response = await fetch(`http://localhost:3001/inscripcion/${id_usuario}/${id_curso}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al verificar la inscripción del usuario');
        }

        const result = await response.json();
        console.log('Respuesta de inscripción:', result);
        return result.enrolled;
    } catch (error) {
        console.error('Error al verificar la inscripción del usuario:', error);
        return false;
    }
}

