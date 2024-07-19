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