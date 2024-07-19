document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var myDiv = document.querySelector(".principal");
        myDiv.classList.add("fade-out");

        // Espera el tiempo de la transición antes de ocultar el div
        myDiv.addEventListener('transitionend', function () {
            myDiv.style.display = 'none';
        }, { once: true });
    }, 1000); // 1 segundo
});

// ABRIR LA CARÁTULA
document.querySelectorAll(".column-1").forEach(function (element) {
    element.addEventListener('click', function () {
        var caraturla = document.querySelector(".caratula");

        caraturla.classList.add('visible');
    });
});

// CERRAR LA CARÁTULA
document.querySelector(".bi-x-lg").addEventListener('click', function () {
    var caraturla = document.querySelector(".caratula");

    caraturla.classList.remove('visible');
})


// HACER SONAR LA CANCIÓN
const btnPlay = document.getElementById('btn-play');
const audio = document.getElementById('audio');
const playIcon = document.getElementById('play-icon');

btnPlay.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('bi-play-fill');
        playIcon.classList.add('bi-pause-fill');
    } else {
        audio.pause();
        playIcon.classList.remove('bi-pause-fill');
        playIcon.classList.add('bi-play-fill');
    }
});