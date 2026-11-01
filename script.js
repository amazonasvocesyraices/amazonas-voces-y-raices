document.addEventListener("DOMContentLoaded", function () {
    console.log("Bienvenido a Amazonas Voces y Raíces");

    const enlaces = document.querySelectorAll("nav a");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function () {
            console.log("Navegando a: " + this.textContent);
        });
    });
});
