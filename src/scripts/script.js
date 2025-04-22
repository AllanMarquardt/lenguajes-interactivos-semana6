window.addEventListener('DOMContentLoaded', function() {
    let iniciarModalComentarios = document.querySelector('#iniciarModalComentarios');
    let cerrarModalComentarios = document.querySelector('#cerrarModalComentarios');
    let modal = document.querySelector('#modalComentarios');

    let formulario = document.querySelector('#formularioComentarios');
    let numComentarios = document.querySelector('#numComentarios');
    let comentario = document.querySelector('#comentario');

    let botonMostrarMas = document.querySelector('#botonMostrarMas');
    let comentariosExpandido = false;

    const arrComentarios = [];



    // Mostrar el modal de comentarios al hacer clic en el botón "Comentar"
    iniciarModalComentarios.addEventListener('click', function() {
        modal.classList.remove('hidden');
    });

    // Cerrar el modal de comentarios al hacer clic en el botón X
    cerrarModalComentarios.addEventListener('click', function() {
        modal.classList.add('hidden');
    });



    // Funciones al enviar el formulario
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
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
    
        // Logica para mostrar el 1° comentario o todos
        if (arrComentarios.length === 1) { // Si es el primer comentario, mostrarlo directamente y sin botón
            mostrarPrimerComentario(arrComentarios);
            botonMostrarMas.classList.add('hidden');
            comentariosExpandido = false;
        } else if (comentariosExpandido) { // Si el botón para mostrar ya se presionó, mostrar todos los comentarios y ocultar el botón
            mostrarTodosLosComentarios(arrComentarios);
            botonMostrarMas.classList.add('hidden');
        } else { // Si aún no se presiona el botón, mostrar solo el primer comentario y mostrar el botón
            mostrarPrimerComentario(arrComentarios);
            botonMostrarMas.classList.remove('hidden');
        }

        
        console.log(arrComentarios); // Mostrar el array de comentarios en la consola
    });



    


    // Mostrar solo el primer comentario, agarrando solo el primer elemento del array (arr[0])
    function mostrarPrimerComentario(arr) {
        comentario.innerHTML = `
				<div class="flex gap-4 items-center">
                    <!-- Avatar -->
                    <div class="flex justify-center">
                        <img src="../../src/assets/img/avatar.png" alt="" class="rounded-full w-16 h-16 object-cover border-3 border-gris" />
                    </div>
                    <!-- Nombre y comentario -->
                    <div class="bg-gris rounded-lg p-4 flex flex-col w-full outline-3 outline-azul-claro">
                        <p class="font-medium text-lg text-slate-400">${arr[0].usuario}</p>
                        <p class="text-white">${arr[0].comentario}</p>
                    </div>
                </div>
        `;
    }
    
    // Mostrar todos los comentarios
    function mostrarTodosLosComentarios(arr) {
        comentario.innerHTML = ''; // Limpiar el contenedor de comentarios para no repetir el primero
    
        arr.forEach((item) => {
            comentario.innerHTML += `
				<div class="flex gap-4 items-center">
                    <!-- Avatar -->
                    <div class="flex justify-center">
                        <img src="../../src/assets/img/avatar.png" alt="" class="rounded-full w-16 h-16 object-cover border-3 border-gris" />
                    </div>
                    <!-- Nombre y comentario -->
                    <div class="bg-gris rounded-lg p-4 flex flex-col w-full outline-3 outline-azul-claro">
                        <p class="font-medium text-lg text-slate-400">${item.usuario}</p>
                        <p class="text-white">${item.comentario}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // Evento para el botón "Mostrar más"
    botonMostrarMas.addEventListener('click', function () {
        mostrarTodosLosComentarios(arrComentarios);
        botonMostrarMas.classList.add('hidden'); // Ocultar el botón al ser presionado
        comentariosExpandido = true; // Se marca que ya se expandieron los comentarios
    });
})