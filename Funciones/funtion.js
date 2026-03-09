/* ================================================================
   funciones.js — JavaScript del Blog Educativo de Etiquetas HTML
   Este archivo se carga en todas las páginas del blog.
   Cada función tiene sus comentarios para entender qué hace.
================================================================ */


/* ----------------------------------------------------------------
   FUNCIÓN 1 — RESALTAR EL ENLACE ACTIVO DEL MENÚ
   Lee la URL de la página actual y le pone la clase
   "enlace-menu-activo" al enlace que corresponda.
   Así no tenemos que escribir esa clase a mano en cada página.
---------------------------------------------------------------- */

function marcarEnlaceActivo() {

  // Obtenemos el nombre del archivo actual de la URL
  // Por ejemplo: "http://misitio.com/listas.html"
  // window.location.href guarda toda la URL completa
  var urlCompleta = window.location.href;

  // Buscamos todos los enlaces que hay dentro del menú
  // querySelectorAll devuelve una lista de todos los que cumplan el selector
  var todosLosEnlacesMenu = document.querySelectorAll('.enlace-menu');

  // Recorremos cada enlace del menú uno por uno
  todosLosEnlacesMenu.forEach(function(enlace) {

    // Primero quitamos la clase activa de todos los enlaces
    // para empezar desde cero (evita duplicados)
    enlace.classList.remove('enlace-menu-activo');

    // Leemos el href de este enlace (por ejemplo: "listas.html")
    var destino = enlace.getAttribute('href');

    // Comprobamos si la URL actual contiene el nombre del archivo
    // Por ejemplo: "http://misitio.com/listas.html".includes("listas.html") → true
    if (urlCompleta.includes(destino)) {

      // Si sí coincide, le añadimos la clase activa para resaltarlo
      enlace.classList.add('enlace-menu-activo');

    }

  }); // fin del forEach de enlaces

} // fin de marcarEnlaceActivo


/* ----------------------------------------------------------------
   FUNCIÓN 2 — MANEJAR EL ENVÍO DEL FORMULARIO
   Previene que la página se recargue, valida que los campos
   obligatorios tengan contenido, y muestra un mensaje de éxito.
---------------------------------------------------------------- */

function configurarFormulario() {

  // Buscamos el formulario en la página actual
  // Si no hay formulario, querySelector devuelve null
  var formulario = document.querySelector('.formulario-contacto');

  // Si no existe el formulario en esta página, salimos
  // (esta función solo aplica a formularios.html)
  if (!formulario) {
    return; // "return" sin valor termina la función sin hacer nada más
  }

  // Le decimos al formulario: cuando se intente enviar, ejecuta esta función
  formulario.addEventListener('submit', function(evento) {

    // Prevenimos el comportamiento por defecto del formulario
    // que es recargar la página al hacer submit
    evento.preventDefault();

    // ── Validación del campo de nombre ──────────────────────────
    // Buscamos el campo con id "campo-nombre"
    var campNombre = document.getElementById('campo-nombre');

    // Leemos lo que escribió el usuario y quitamos espacios sobrantes
    // .trim() elimina los espacios al inicio y al final
    var valorNombre = campNombre.value.trim();

    // Si el nombre está vacío después de quitar espacios
    if (valorNombre === '') {

      // Mostramos el mensaje de error del nombre
      mostrarError('error-nombre', 'Por favor escribe tu nombre completo.');

      // Ponemos el foco en el campo para que el usuario lo vea
      campNombre.focus();

      // Salimos de la función sin continuar
      return;

    } else {

      // Si el nombre está bien, ocultamos cualquier error anterior
      ocultarError('error-nombre');

    }

    // ── Validación del campo de correo ───────────────────────────
    var campCorreo = document.getElementById('campo-correo');
    var valorCorreo = campCorreo.value.trim();

    // Verificamos si el correo contiene "@" y "." mínimamente
    // Esta es una validación simple; el navegador ya valida type="email"
    if (valorCorreo !== '' && !valorCorreo.includes('@')) {

      mostrarError('error-correo', 'El correo no parece válido. Debe tener @.');
      campCorreo.focus();
      return;

    } else {

      ocultarError('error-correo');

    }

    // ── Si todo está bien: mostramos el mensaje de éxito ─────────
    // Buscamos la caja de éxito en el HTML
    var cajaMensajeExito = document.getElementById('mensaje-exito');

    // Hacemos visible la caja de éxito
    // Por defecto está oculta con display:none en el HTML
    cajaMensajeExito.style.display = 'block';

    // Limpiamos todos los campos del formulario después de enviarlo
    formulario.reset();

    // Después de 4 segundos (4000 milisegundos), ocultamos el mensaje
    setTimeout(function() {
      cajaMensajeExito.style.display = 'none';
    }, 4000);

  }); // fin del addEventListener submit

} // fin de configurarFormulario


/* ----------------------------------------------------------------
   FUNCIÓN AUXILIAR — MOSTRAR MENSAJE DE ERROR
   Recibe el id del elemento de error y el mensaje a mostrar.
---------------------------------------------------------------- */

function mostrarError(idDelElemento, textoDelError) {

  // Buscamos el elemento de error por su id
  var elementoError = document.getElementById(idDelElemento);

  // Si existe, le ponemos el mensaje y lo hacemos visible
  if (elementoError) {
    elementoError.textContent = textoDelError; // ponemos el texto
    elementoError.style.display = 'block';     // lo hacemos visible
  }

} // fin de mostrarError


/* ----------------------------------------------------------------
   FUNCIÓN AUXILIAR — OCULTAR MENSAJE DE ERROR
---------------------------------------------------------------- */

function ocultarError(idDelElemento) {

  var elementoError = document.getElementById(idDelElemento);

  if (elementoError) {
    elementoError.textContent = '';    // borramos el texto
    elementoError.style.display = 'none'; // lo ocultamos
  }

} // fin de ocultarError


/* ----------------------------------------------------------------
   FUNCIÓN 3 — BOTÓN "VOLVER ARRIBA"
   Muestra un botón flotante cuando el usuario baja más de 300px.
   Al hacer clic, sube suavemente al inicio de la página.
---------------------------------------------------------------- */

function configurarBotonArriba() {

  // Buscamos el botón de "volver arriba" en el HTML
  var botonArriba = document.getElementById('boton-arriba');

  // Si no existe el botón en esta página, salimos
  if (!botonArriba) {
    return;
  }

  // Escuchamos el evento scroll de la ventana
  window.addEventListener('scroll', function() {

    // Si el usuario bajó más de 300 píxeles desde el inicio
    if (window.scrollY > 300) {

      // Mostramos el botón añadiéndole la clase "visible"
      botonArriba.classList.add('boton-arriba-visible');

    } else {

      // Si el usuario está cerca del inicio, ocultamos el botón
      botonArriba.classList.remove('boton-arriba-visible');

    }

  }); // fin del addEventListener scroll

  // Cuando el usuario hace clic en el botón
  botonArriba.addEventListener('click', function() {

    // Scrolleamos suavemente al tope de la página
    // behavior: 'smooth' hace la animación suave
    window.scrollTo({
      top: 0,          // ir al píxel 0 (inicio de la página)
      behavior: 'smooth' // con animación suave
    });

  }); // fin del addEventListener click

} // fin de configurarBotonArriba


/* ----------------------------------------------------------------
   FUNCIÓN 4 — CONTADOR DE CARACTERES EN EL TEXTAREA
   Muestra cuántos caracteres ha escrito el usuario en tiempo real.
---------------------------------------------------------------- */

function configurarContadorCaracteres() {

  // Buscamos el textarea del formulario
  var areaTexto = document.getElementById('campo-mensaje');

  // Buscamos el elemento donde mostraremos el contador
  var contadorTexto = document.getElementById('contador-caracteres');

  // Si alguno de los dos no existe, salimos
  if (!areaTexto || !contadorTexto) {
    return;
  }

  // Límite máximo de caracteres permitidos
  var limiteCaracteres = 300;

  // Cada vez que el usuario escribe en el textarea, actualizamos el contador
  areaTexto.addEventListener('input', function() {

    // Contamos cuántos caracteres hay actualmente
    var cantidadActual = areaTexto.value.length;

    // Calculamos cuántos quedan disponibles
    var caracteresRestantes = limiteCaracteres - cantidadActual;

    // Actualizamos el texto del contador
    contadorTexto.textContent = caracteresRestantes + ' caracteres restantes';

    // Si quedan menos de 50 caracteres, cambiamos el color a amarillo de advertencia
    if (caracteresRestantes < 50) {
      contadorTexto.classList.add('contador-advertencia');
    } else {
      contadorTexto.classList.remove('contador-advertencia');
    }

  }); // fin del addEventListener input

} // fin de configurarContadorCaracteres


/* ----------------------------------------------------------------
   FUNCIÓN 5 — COPIAR CÓDIGO AL PORTAPAPELES
   Al hacer clic en un bloque de código, lo copia al portapapeles
   y muestra una confirmación temporal.
---------------------------------------------------------------- */

function configurarCopiarCodigo() {

  // Buscamos todos los bloques de código de la página
  var todosLosBloqueCodigo = document.querySelectorAll('.bloque-codigo');

  // Si no hay bloques de código, salimos
  if (todosLosBloqueCodigo.length === 0) {
    return;
  }

  // Recorremos cada bloque de código
  todosLosBloqueCodigo.forEach(function(bloque) {

    // Le ponemos un título que indique que se puede copiar
    bloque.setAttribute('title', 'Haz clic para copiar el código');

    // Cambiamos el cursor para indicar que es clickeable
    bloque.style.cursor = 'pointer';

    // Cuando el usuario hace clic en el bloque
    bloque.addEventListener('click', function() {

      // Obtenemos el texto del bloque, quitando las etiquetas HTML que hay dentro
      // innerText obtiene solo el texto visible, sin etiquetas HTML
      var textoDeCodigo = bloque.innerText;

      // Usamos la API del navegador para copiar al portapapeles
      // navigator.clipboard.writeText devuelve una promesa (Promise)
      navigator.clipboard.writeText(textoDeCodigo).then(function() {

        // Si la copia fue exitosa, guardamos el texto original del bloque
        var textoOriginal = bloque.getAttribute('title');

        // Cambiamos el título temporalmente para dar feedback
        bloque.setAttribute('title', '✅ ¡Código copiado!');

        // Añadimos una clase visual de "copiado"
        bloque.classList.add('bloque-codigo-copiado');

        // Después de 2 segundos, volvemos al estado original
        setTimeout(function() {
          bloque.setAttribute('title', textoOriginal);
          bloque.classList.remove('bloque-codigo-copiado');
        }, 2000);

      }).catch(function() {

        // Si hubo un error (algunos navegadores bloquean esto)
        // simplemente no hacemos nada (fallo silencioso)
        console.log('No se pudo copiar al portapapeles automáticamente.');

      }); // fin del .then/.catch de clipboard

    }); // fin del addEventListener click del bloque

  }); // fin del forEach de bloques de código

} // fin de configurarCopiarCodigo


/* ================================================================
   PUNTO DE ENTRADA — se ejecuta cuando la página termina de cargar
   Aquí llamamos a todas las funciones en orden.
================================================================ */

// El evento "DOMContentLoaded" se dispara cuando el HTML terminó de cargarse
// Es el momento correcto para ejecutar nuestro JavaScript
document.addEventListener('DOMContentLoaded', function() {

  // 1. Marcamos el enlace del menú que corresponde a la página actual
  marcarEnlaceActivo();

  // 2. Configuramos la validación y envío del formulario (solo actúa si existe)
  configurarFormulario();

  // 3. Configuramos el botón de "volver arriba" (solo actúa si existe)
  configurarBotonArriba();

  // 4. Configuramos el contador de caracteres del textarea (solo actúa si existe)
  configurarContadorCaracteres();

  // 5. Configuramos el clic para copiar código (actúa en todos los bloques)
  configurarCopiarCodigo();

});  // fin del DOMContentLoaded