// Ejecuta la función cuando todo el contenido del DOM ha sido cargado
document.addEventListener("DOMContentLoaded", function () {
    // Establece un temporizador de 1 segundo
    setTimeout(function () {
        // Selecciona el elemento con la clase "principal"
        var myDiv = document.querySelector(".principal");
        // Añade la clase "fade-out" al elemento seleccionado
        myDiv.classList.add("fade-out");

        // Espera a que la transición termine antes de ocultar el div
        myDiv.addEventListener('transitionend', function () {
            // Cambia el estilo de display a 'none' para ocultar el div
            myDiv.style.display = 'none';
        }, { once: true }); // Se asegura de que el evento se escuche solo una vez
    }, 1000); // Espera 1 segundo antes de ejecutar el código dentro de setTimeout
});

// ABRIR LA CARÁTULA
// Selecciona todos los elementos con la clase "column-1" y les añade un evento click
document.querySelectorAll(".column-1").forEach(function (element) {
    element.addEventListener('click', function () {
        // Selecciona el elemento con la clase "caratula"
        var caraturla = document.querySelector(".caratula");
        // Añade la clase "visible" para mostrar la carátula
        caraturla.classList.add('visible');
    });
});

// CERRAR LA CARÁTULA
// Selecciona el elemento con la clase "bi-x-lg" y le añade un evento click
document.querySelector(".bi-x-lg").addEventListener('click', function () {
    // Selecciona el elemento con la clase "caratula"
    var caraturla = document.querySelector(".caratula");
    // Elimina la clase "visible" para ocultar la carátula
    caraturla.classList.remove('visible');
});

// Variables para manejar la reproducción de la canción y la barra de progreso
const btnPlay = document.getElementById('btn-play'); // Botón de reproducción
const audio = document.getElementById('audio'); // Elemento de audio
const playIcon = document.getElementById('play-icon'); // Icono de reproducción/pausa
const progressBar = document.getElementById('progress-bar'); // Barra de progreso
const currentTimeElem = document.getElementById('current-time'); // Tiempo actual
const totalTimeElem = document.getElementById('total-time'); // Tiempo total

// HACER SONAR LA CANCIÓN
// Añade un evento click al botón de reproducción
btnPlay.addEventListener('click', () => {
    // Si la canción está pausada, la reproduce
    if (audio.paused) {
        audio.play();
        // Cambia el icono a "pausa"
        playIcon.classList.remove('bi-play-fill');
        playIcon.classList.add('bi-pause-fill');
    } else {
        // Si la canción está reproduciéndose, la pausa
        audio.pause();
        // Cambia el icono a "reproducción"
        playIcon.classList.remove('bi-pause-fill');
        playIcon.classList.add('bi-play-fill');
    }
});

// MOVER LA BARRA DE PROGRESO DE LA CANCIÓN
// Añade un evento para actualizar la barra de progreso mientras la canción se reproduce
audio.addEventListener('timeupdate', () => {
    // Obtiene el tiempo actual de reproducción y la duración total de la canción
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    // Calcula el porcentaje de progreso
    const progress = (currentTime / duration) * 100;
    // Actualiza el ancho de la barra de progreso
    progressBar.style.width = progress + '%';
    // Actualiza el texto del tiempo actual
    currentTimeElem.textContent = formatTime(currentTime);
});

// Añade un evento para mostrar la duración total de la canción cuando se carga la metadata
audio.addEventListener('loadedmetadata', () => {
    totalTimeElem.textContent = formatTime(audio.duration);
});

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Calcula los minutos
    const secs = Math.floor(seconds % 60); // Calcula los segundos
    // Devuelve el tiempo formateado en "minutos:segundos"
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}