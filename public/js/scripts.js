const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const urlOriginal = document.querySelector('#urlOriginal').nodeValue;

    console.log(e.target);
    const respuesta = await fetch(e.target.action, {
        method: e.target.method, 
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ urlOriginal : urlOriginal})
    });

    const resultado = await respuesta.json();

    // Eliminar los mensajes anteriores
    const alertas = document.querySelector('.mensaje-url');
    if(alertas){
        document.querySelector('.mensaje-url').remove();
    }
    // Verificar si todo está bien
    if(resultado.codigo == 201){
        // Mensaje todo se creó bien
        const mensaje = document = document.createElement('div');
        mensaje.classList.add('mensaje-url');
        mensaje.innerHTML = `<p>Se ha acortado correctamente la URL, visita <a target= "_blank" rel="noopener noreferrer" href="/${resultado.url}"> el enlace aquí</a> </p>`;

        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    } else{
        // construir un mensaje de error
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url', 'error');
        mensaje.innerHTML = `<p>${resultado.error}</p>`;

        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    }
    
});

// Si hay un error en el querystring
const urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('error')){
    // Construir template
    const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url', 'error');
        mensaje.innerHTML = `<p>URL no válida</p>`;

        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
}