window.addEventListener("load", function () {
  // Establece un temporizador de 1 segundo
  setTimeout(function () {
    // Selecciona el elemento con la clase "principal"
    var myDiv = document.querySelector(".principal");
    // Añade la clase "fade-out" al elemento seleccionado
    myDiv.classList.add("fade-out");

    // Espera a que la transición termine antes de ocultar el div
    myDiv.addEventListener(
      "transitionend",
      function () {
        // Cambia el estilo de display a 'none' para ocultar el div
        myDiv.style.display = "none";
      },
      { once: true }
    ); // Se asegura de que el evento se escuche solo una vez
  }, 1000); // Espera 1 segundo antes de ejecutar el código dentro de setTimeout
});

// ARRAY DE LAS CANCIONES

// Array para almacenar todas las canciones
let songs = [];
document.querySelectorAll(".song").forEach(function (songElement) {
  songs.push(songElement);
});

// REEMPLAZAR LOS VALORES DE LA CARÁTULA

// Función para reproducir una canción
function playSong(songElement) {
  var imageD = songElement.getAttribute("data-imgd");
  var img = songElement.getAttribute("data-img");
  var title = songElement.getAttribute("data-title");
  var artist = songElement.getAttribute("data-artist");
  var audioSrc = songElement.getAttribute("data-audio");

  // Actualiza la fuente del elemento de audio
  var audioElement = document.getElementById("audio");
  audioElement.src = audioSrc;
  audioElement.play();

  var caratula = document.querySelector(".caratula");

  // CAMBIAR EL ARTISTA
  caratula.querySelector("p").textContent = artist;
  // CAMBIAR LA IMG MAIN
  caratula.querySelector(".main-part img").src = img;
  // CAMBIAR EL TÍTULO
  caratula.querySelector("h2").textContent = title;

  var contCara = caratula.querySelector(".cont-cara");

  // CAMBIAR EL FONDO DIFUMINADO
  contCara.style.backgroundImage = `url(${imageD})`;

  // HACER VISIBLE A LA CARÁTULA
  caratula.classList.add("visible");

  // Reinicia la canción al hacer clic en el icono de recargar
  document
    .querySelector(".bi-arrow-clockwise")
    .addEventListener("click", function () {
      var audioElement = document.getElementById("audio");
      audioElement.currentTime = 0;
      audioElement.play();
    });
}

// Variable para almacenar el índice de la canción actual
let currentSongIndex = -1;

// Reproducir la canción anterior
document
  .querySelector(".bi-chevron-bar-left")
  .addEventListener("click", function () {
    if (currentSongIndex > 0) {
      currentSongIndex--;
      playSong(songs[currentSongIndex]);
    }
  });

// Reproducir la siguiente canción
document
  .querySelector(".bi-chevron-bar-right")
  .addEventListener("click", function () {
    if (currentSongIndex < songs.length - 1) {
      currentSongIndex++;
      playSong(songs[currentSongIndex]);
    }
  });

// Actualizar el índice y reproducir la canción seleccionada al hacer clic en una canción
document.querySelectorAll(".column-1").forEach(function (element, index) {
  element.addEventListener("click", function () {
    currentSongIndex = index;
    playSong(element.closest(".song"));
  });
});

// Reiniciar la canción al hacer clic en el icono de recargar
document
  .querySelector(".bi-arrow-clockwise")
  .addEventListener("click", function () {
    var audioElement = document.getElementById("audio");
    audioElement.currentTime = 0;
    audioElement.play();
  });

// Cerrar la carátula
document
  .querySelectorAll(".bi-x-lg, .bi-arrow-left")
  .forEach(function (element) {
    element.addEventListener("click", function () {
      var caraturla = document.querySelector(".caratula");
      caraturla.classList.remove("visible");
    });
  });

// Alternar el icono del corazón al hacer clic
document.querySelector(".bi-heart").addEventListener("click", function () {
  this.classList.toggle("red");
  this.classList.toggle("bi-heart");
  this.classList.toggle("bi-heart-fill");
});

// Reproducir una canción al azar al hacer clic en el icono de mezcla
document.querySelector(".bi-shuffle").addEventListener("click", function () {
  var randomIndex = Math.floor(Math.random() * songs.length);
  var randomSong = songs[randomIndex];
  currentSongIndex = randomIndex;
  playSong(randomSong);
});

// Variables para manejar la reproducción de la canción y la barra de progreso
const btnPlay = document.getElementById("btn-play"); // Botón de reproducción
const audio = document.getElementById("audio"); // Elemento de audio
const playIcon = document.getElementById("play-icon"); // Icono de reproducción/pausa
const progressBar = document.getElementById("progress-bar"); // Barra de progreso
const currentTimeElem = document.getElementById("current-time"); // Tiempo actual
const totalTimeElem = document.getElementById("total-time"); // Tiempo total

// MOVER LA BARRA DE PROGRESO DE LA CANCIÓN
// Añade un evento para actualizar la barra de progreso mientras la canción se reproduce
audio.addEventListener("timeupdate", () => {
  // Obtiene el tiempo actual de reproducción y la duración total de la canción
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  // Calcula el porcentaje de progreso
  const progress = (currentTime / duration) * 100;
  // Actualiza el ancho de la barra de progreso
  progressBar.style.width = progress + "%";
  // Actualiza el texto del tiempo actual
  currentTimeElem.textContent = formatTime(currentTime);
});

btnPlay.addEventListener("click", () => {
  // Si la canción está pausada, la reproduce
  if (audio.paused) {
    audio.play();
    // Cambia el icono a "pausa"
    playIcon.classList.remove("bi-play-fill");
    playIcon.classList.add("bi-pause-fill");
  } else {
    // Si la canción está reproduciéndose, la pausa
    audio.pause();
    // Cambia el icono a "reproducción"
    playIcon.classList.remove("bi-pause-fill");
    playIcon.classList.add("bi-play-fill");
  }
});

// Añade un evento para mostrar la duración total de la canción cuando se carga la metadata
audio.addEventListener("loadedmetadata", () => {
  totalTimeElem.textContent = formatTime(audio.duration);
});

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); // Calcula los minutos
  const secs = Math.floor(seconds % 60); // Calcula los segundos
  // Devuelve el tiempo formateado en "minutos:segundos"
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
