// 1. SE DESCARGAN LOS ARCHIVOS IMPORTANTES
// ------------------------------------------------------

const mp3Resources = [
  'src/songs/Hymn for the Weekend - (Radio Edit).mp3',
  'src/songs/Green Day - American Idiot lyrics [1080p].mp3',
  'src/songs/Alan Walker - Faded.mp3',
  'src/songs/Manuel Turizo - La Bachata.mp3',
  'src/songs/Rammstein - Du Hast (Official 4K Video).mp3',
  'src/songs/Thriller (2003 Edit).mp3',
  'src/songs/The-Weeknd-Blinding-Lights-(Official Audio).mp3',
  'src/songs/In The End [Official HD Music Video] - Linkin Park.mp3',
  'src/songs/System Of A Down - Chop Suey! (Official HD Video).mp3',
  'src/songs/Kiss Me More.mp3',
  'src/songs/Rauw Alejandro - Todo de Ti (LetraLyrics).mp3',
  'src/img/american iditot - green day dif.png',
  'src/img/ChopSuey-System-Of-A-Down-dif.png',
  'src/img/Coldplay,_Hymn_for_the_Weekend dif.png',
  'src/img/Du-hast-Rammstein-dif.png',
  'src/img/faded-alanwalkerdif.png',
  'src/img/Kiss-me-more-Doja-cat-dif.png',
  'src/img/la-bachata-manuel-turizo-dif.png',
  'src/img/LinkinParkIntheEnd-dif.png',
  'src/img/Michael_Jackson_-_Thriller-dif.png',
  'src/img/Rauw-Alejandro-Todo-de-Ti-dif.png',
  'src/img/The_Weeknd_-_Blinding_Lights-dif.png',
];

// Función para cargar los archivos
function loadFiles(files, callback) {
  let loaded = 0;
  const total = files.length;

  files.forEach((url) => {
    let media;
    if (url.endsWith('.mp3')) {
      media = new Audio();
    } else if (url.endsWith('.png')) {
      media = new Image();
    }

    if (media) {
      media.src = url;
      media.oncanplaythrough = media.onload = () => {
        loaded++;
        if (loaded === total) {
          callback();
        }
      };
      // MANEJAR ERRORES
      media.onerror = () => {
        console.error(`Error al descargar el archivo: ${url}`);
        loaded++;
        if (loaded === total) {
          callback();
        }
      };
    } else {
      console.warn(`Archivo no soportado: ${url}`);
      loaded++;
      if (loaded === total) {
        callback();
      }
    }
  });
}

// Inicializar la aplicación después de cargar los archivos
loadFiles(mp3Resources, function () {
  console.log('Todos los archivos se descargaron correctamente!');
  // Aquí puedes inicializar la aplicación
  // initApp();
});

// 2. CERRAR LA VISTA DE INICIO (PRESENTACIÓN DE LA APP)
// ------------------------------------------------------  

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

// Array para almacenar todas las canciones
let songs = [];
document.querySelectorAll(".song").forEach(function (songElement) {
  songs.push(songElement);
});

// 3. PARA REPRODUCIR LA CANCIÓN
// ------------------------------------------------------

// Función para reproducir una canción
function playSong(songElement) {
  // 1. CAMBIAR LA INFO DE LA PLANTILLA "CARATULA"

  var imageD = songElement.getAttribute("data-imgd");
  var img = songElement.getAttribute("data-img");
  var title = songElement.getAttribute("data-title");
  var artist = songElement.getAttribute("data-artist");
  var audioSrc = songElement.getAttribute("data-audio");

  var audioElement = document.getElementById("audio");

  // Solo actualiza la fuente y la información si la canción ha cambiado

  // CUANDO SELECCIONO UNA CANCIÓN SE GUARDA SU "SRC"
  // ENTONCES, SI NO HAY UNA CANCIÓN ENTONCES REPRODUCE LA SELECCIONADA
  if (audioElement.src !== audioSrc) {
    audioElement.src = audioSrc;
    audioElement.play();

    // Espera a que se cargue la metadata del audio
    audioElement.addEventListener("loadedmetadata", function () {
      var duration = audioElement.duration;
      var totalTimeActive = formatTime(duration); // Formatea el tiempo

      var caratula = document.querySelector(".caratula");

      var contCara = caratula.querySelector(".cont-cara");

      // CAMBIAR EL FONDO DIFUMINADO
      contCara.style.backgroundImage = `url(${imageD})`;

      // CAMBIAR EL ARTISTA
      caratula.querySelector("p").textContent = artist;
      // CAMBIAR LA IMG MAIN
      caratula.querySelector(".main-part img").src = img;
      // CAMBIAR EL TÍTULO
      caratula.querySelector("h2").textContent = title;

      // HACER VISIBLE A LA CARÁTULA
      caratula.classList.add("visible");

      // CAMBIO EL ESTILO DEL CONTENEDOR SONGS
      let contSongs = document.querySelector(".songs");
      contSongs.style.height = "70%";

      // Seleccionar el elemento con la clase "abajo"
      var abajoElement = document.querySelector(".abajo");

      // Limpiar los elementos existentes de progreso y canción

      // 2. PARA CREAR LA VISTA DE LA CANCIÓN ACTUAL

      var existingProgress = abajoElement.querySelector(".progress");
      var existingSong = abajoElement.querySelector(".song-active");

      if (existingProgress) existingProgress.remove();
      if (existingSong) existingSong.remove();

      // CREAR EL VIEW DE LA CANCIÓN ACTUAL
      var progressDiv = document.createElement("div");
      progressDiv.className = "progress";
      progressDiv.setAttribute("role", "progressbar");
      progressDiv.setAttribute("aria-label", "Basic example");
      progressDiv.setAttribute("aria-valuenow", "75");
      progressDiv.setAttribute("aria-valuemin", "0");
      progressDiv.setAttribute("aria-valuemax", "100");

      var progressBarDiv = document.createElement("div");
      progressBarDiv.className = "progress-bar";
      progressBarDiv.style.width = "75%";

      progressDiv.appendChild(progressBarDiv);

      var songActiveDiv = document.createElement("div");
      songActiveDiv.className =
        "song-active d-flex justify-content-between align-items-center";

      var column1Div = document.createElement("div");
      column1Div.className = "column-1 d-flex align-items-center";

      var imgActive = document.createElement("img");
      imgActive.src = img;
      imgActive.alt = "";

      var infoSongDiv = document.createElement("div");
      infoSongDiv.className = "info-song";

      var titleP = document.createElement("p");
      titleP.className = "title";
      titleP.textContent = title;

      var autorP = document.createElement("p");
      autorP.className = "autor";
      autorP.textContent = `${totalTimeActive} | ${artist}`;

      infoSongDiv.appendChild(titleP);
      infoSongDiv.appendChild(autorP);

      column1Div.appendChild(imgActive);
      column1Div.appendChild(infoSongDiv);

      var column2Div = document.createElement("div");
      column2Div.className =
        "column-2 d-flex align-items-center justify-content-center";

      var playIcon = document.createElement("i");
      playIcon.className = "bi bi-pause-fill";

      // Añadir el manejador de eventos al icono
      column2Div.addEventListener("click", function () {
        if (audioElement.paused) {
          audioElement.play();
          playIcon.classList.remove("bi-play-fill");
          playIcon.classList.add("bi-pause-fill");
        } else {
          audioElement.pause();
          playIcon.classList.remove("bi-pause-fill");
          playIcon.classList.add("bi-play-fill");
        }
      });

      column2Div.appendChild(playIcon);

      songActiveDiv.appendChild(column1Div);
      songActiveDiv.appendChild(column2Div);

      abajoElement.style.height = "20%";
      abajoElement.style.display = "block";
      abajoElement.style.border = "0px";

      abajoElement.insertBefore(songActiveDiv, abajoElement.firstChild);
      abajoElement.insertBefore(progressDiv, abajoElement.firstChild);

      var btnsElement = document.querySelector(".btns-abajo");
      btnsElement.style.borderTop = "2px solid white";

      // Actualizar la barra de progreso en tiempo real
      audioElement.addEventListener("timeupdate", function () {
        var currentTime = audioElement.currentTime;
        var duration = audioElement.duration;
        var progress = (currentTime / duration) * 100;
        progressBarDiv.style.width = progress + "%";
        progressDiv.setAttribute("aria-valuenow", progress); // Actualiza el valor actual
      });
    });
  } else {
    // Solo muestra la carátula si la canción ya está en reproducción
    var caratula = document.querySelector(".caratula");
    caratula.classList.add("visible");
  }
}

// Añadir evento de clic en song-active para mostrar la carátula sin reiniciar la canción
document.querySelector(".abajo").addEventListener("click", function (event) {
  if (event.target.closest(".column-1")) {
    var caratula = document.querySelector(".caratula");
    caratula.classList.add("visible");
  }
});

// Variable para almacenar el índice de la canción actual
let currentSongIndex = -1;

// Actualizar el índice y reproducir la canción seleccionada al hacer clic en una canción
document.querySelectorAll(".column-1").forEach(function (element, index) {
  element.addEventListener("click", function () {

    if (currentSongIndex == index) {
      var caratula = document.querySelector(".caratula");
      caratula.classList.add("visible");
    } else {
      currentSongIndex = index;
      playSong(element.closest(".song"));
    }
  });
});

// 4. BOTONES Y ELEMENTOS DE LA CARÁTULA DE LA CANCIÓN
// ------------------------------------------------------

// Reproducir la canción anterior
document
  .querySelector(".bi-chevron-bar-left")
  .addEventListener("click", function () {
    if (currentSongIndex > 0) {
      currentSongIndex--;
    } else {
      currentSongIndex = songs.length - 1; // Ir a la última canción si está en la primera
    }
    playSong(songs[currentSongIndex]);
  });

// Reproducir la siguiente canción
document
  .querySelector(".bi-chevron-bar-right")
  .addEventListener("click", function () {
    if (currentSongIndex < songs.length - 1) {
      currentSongIndex++;
    } else {
      currentSongIndex = 0; // Ir a la primera canción si está en la última
    }
    playSong(songs[currentSongIndex]);
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

// Evento para manejar el fin de la canción y reproducir la siguiente
audio.addEventListener("ended", () => {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0; // Ir a la primera canción si está en la última
  }
  playSong(songs[currentSongIndex]);
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

const progressBarContainer = document.querySelector(".progress"); // Contenedor de la barra de progreso

progressBarContainer.addEventListener("click", (event) => {
  const rect = progressBarContainer.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const totalWidth = rect.width;
  const clickPosition = offsetX / totalWidth;
  const newTime = clickPosition * audio.duration;

  audio.currentTime = newTime;
});
