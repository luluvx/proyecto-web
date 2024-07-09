document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#login-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const correo_electronico = document.querySelector('#email').value;
        const contrasena = document.querySelector('#password').value;
        const emailErrorElement = document.getElementById('email-error');
        const passwordErrorElement = document.getElementById('password-error');

        // Limpiar mensajes de error previos
        emailErrorElement.style.display = 'none';
        passwordErrorElement.style.display = 'none';
        emailErrorElement.textContent = '';
        passwordErrorElement.textContent = '';

        let hasError = false;

        // Validar correo electrónico
        if (!correo_electronico) {
            emailErrorElement.textContent = 'El correo electrónico es obligatorio.';
            emailErrorElement.style.display = 'block';
            hasError = true;
        } else if (!validateEmail(correo_electronico)) {
            emailErrorElement.textContent = 'El formato del correo electrónico no es válido.';
            emailErrorElement.style.display = 'block';
            hasError = true;
        }

        // Validar contraseña
        if (!contrasena) {
            passwordErrorElement.textContent = 'La contraseña es obligatoria.';
            passwordErrorElement.style.display = 'block';
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_electronico, contrasena })
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const usuario = await response.json();

                    localStorage.setItem('userInSession', JSON.stringify(usuario));

                    if (usuario.tipodeusuario === 'admin') {
                        console.log('Usuario logueado:', usuario, 'Redirigiendo a la página de inicio de administrador');
                        window.location.href = 'admin/pages/home-admin-courses.html';
                    } else {
                        console.log('Usuario logueado:', usuario, 'Redirigiendo a la página de inicio');
                        window.location.href = 'client/pages/home-registered-user.html';
                    }
                } else {
                    console.error('La respuesta no es JSON válido:', await response.text());
                }
            } else {
                const errorResponse = await response.json();
                console.error('Error en la respuesta del servidor:', response.status, response.statusText);
                emailErrorElement.textContent = errorResponse.message || 'Error en la autenticación';
                emailErrorElement.style.display = 'block';
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            emailErrorElement.textContent = 'Error en la solicitud de inicio de sesión. Inténtelo nuevamente más tarde.';
            emailErrorElement.style.display = 'block';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
