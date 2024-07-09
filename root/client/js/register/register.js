document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo_electronico = document.getElementById('correo_electronico').value;
        const contrasena = document.getElementById('contrasena').value;

        const nombreErrorElement = document.getElementById('nombre-error');
        const apellidoErrorElement = document.getElementById('apellido-error');
        const correoErrorElement = document.getElementById('correo-error');
        const contrasenaErrorElement = document.getElementById('contrasena-error');


        nombreErrorElement.style.display = 'none';
        apellidoErrorElement.style.display = 'none';
        correoErrorElement.style.display = 'none';
        contrasenaErrorElement.style.display = 'none';
        nombreErrorElement.textContent = '';
        apellidoErrorElement.textContent = '';
        correoErrorElement.textContent = '';
        contrasenaErrorElement.textContent = '';

        let hayError = false;


        if (!nombre) {
            nombreErrorElement.textContent = 'El nombre es obligatorio.';
            nombreErrorElement.style.display = 'block';
            hayError = true;
        }


        if (!apellido) {
            apellidoErrorElement.textContent = 'El apellido es obligatorio.';
            apellidoErrorElement.style.display = 'block';
            hayError = true;
        }


        if (!correo_electronico) {
            correoErrorElement.textContent = 'El correo electrónico es obligatorio.';
            correoErrorElement.style.display = 'block';
            hayError = true;
        }

        if (!contrasena) {
            contrasenaErrorElement.textContent = 'La contraseña es obligatoria.';
            contrasenaErrorElement.style.display = 'block';
            hayError = true;
        }

        if (hayError) {
            return;
        }

        fetch('http://localhost:3001/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                correo_electronico: correo_electronico,
                contrasena: contrasena,
                tipoDeUsuario: 'usuario',
            }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.message); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);


                window.location.href = '../../login-page.html';
            })
            .catch(error => {
                console.error('Error:', error);
                correoErrorElement.textContent = error.message || 'Error en el registro. Inténtelo nuevamente más tarde.';
                correoErrorElement.style.display = 'block';
            });
    });
});
