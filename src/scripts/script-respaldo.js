window.addEventListener('DOMContentLoaded', function() {
    let iniciarModalComentarios = document.querySelector('#buttonModalComentarios');
    let cerrarModalComentarios = document.querySelector('#cerrarModalComentarios');
    let modal = document.querySelector('#modalComentarios');
    let formulario = document.querySelector('#formularioComentarios');
    let numComentarios = document.querySelector('#numComentarios');
    let comentario = document.querySelector('#comentario');

    const arrComentarios = [];

    // Mostrar el modal de comentarios al hacer clic en el botón
    iniciarModalComentarios.addEventListener('click', function() {
        modal.classList.remove('hidden');
    });

    // Cerrar el modal de comentarios al hacer clic en el botón X
    cerrarModalComentarios.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Funciones al enviar el formulario
    formulario.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir recarga
        modal.classList.add('hidden'); // Cerrar el modal al enviar el formulario
    
        let infoUsuario = document.querySelector('#info-user');
        let infoComentario = document.querySelector('#info-comentario');
    
        let objUser = {
            usuario: infoUsuario.value,
            comentario: infoComentario.value
        };
    
        arrComentarios.push(objUser); // Agregar el comentario al array
        formulario.reset(); // Limpiar el formulario
        numComentarios.innerHTML = `${arrComentarios.length} comentarios`; // Actualizar el número de comentarios
    
        mostrarPrimerComentario(arrComentarios);
    
        // Mostrar el botón "Mostrar más" si hay más de un comentario
        if (arrComentarios.length > 1) {
            let botonMostrarMas = document.querySelector('#botonMostrarMas');
            botonMostrarMas.classList.remove('hidden');
        }
    
        console.log(arrComentarios); // Mostrar el array de comentarios en la consola
    });
    
    // Mostrar solo el primer comentario
    function mostrarPrimerComentario(arr) {
        comentario.innerHTML = `
            <div class="flex gap-4 items-center">
                <!-- Avatar -->
                <div class="flex justify-center">
                    <img src="../../src/assets/img/avatar.png" alt="" class="rounded-full w-16 h-16 object-cover border-3 border-pink-300" />
                </div>
                <!-- Nombre y comentario -->
                <div class="bg-pink-300 rounded-lg p-4 flex flex-col w-full">
                    <p class="font-medium text-lg text-pink-900">${arr[0].usuario}</p>
                    <p>${arr[0].comentario}</p>
                </div>
            </div>
        `;
    }
    
    // Mostrar todos los comentarios
    function mostrarTodosLosComentarios(arr) {
        comentario.innerHTML = ''; // Limpiar el contenedor de comentarios
    
        arr.forEach((item) => {
            comentario.innerHTML += `
                <div class="flex gap-4 items-center">
                    <!-- Avatar -->
                    <div class="flex justify-center">
                        <img src="../../src/assets/img/avatar.png" alt="" class="rounded-full w-16 h-16 object-cover border-3 border-pink-300" />
                    </div>
                    <!-- Nombre y comentario -->
                    <div class="bg-pink-300 rounded-lg p-4 flex flex-col w-full">
                        <p class="font-medium text-lg text-pink-900">${item.usuario}</p>
                        <p>${item.comentario}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // Evento para el botón "Mostrar más"
    let botonMostrarMas = document.querySelector('#botonMostrarMas');

    botonMostrarMas.addEventListener('click', function () {
        mostrarTodosLosComentarios(arrComentarios);
        botonMostrarMas.classList.add('hidden'); // Ocultar el botón después de mostrar todos los comentarios
    });
})