(function () {
    "use strict";

    var header = document.querySelector(".site-header");
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".site-nav__toggle");
    var menu = document.getElementById("menu-principal");

    function atualizarHeader() {
        if (!header) return;
        header.classList.toggle("site-header--scrolled", window.scrollY > 12);
    }

    function fecharMenu() {
        if (!nav || !toggle) return;
        nav.classList.remove("site-nav--open");
        toggle.setAttribute("aria-expanded", "false");
    }

    atualizarHeader();
    window.addEventListener("scroll", atualizarHeader, { passive: true });

    if (!toggle || !menu || !nav) return;

    toggle.addEventListener("click", function () {
        var aberto = nav.classList.toggle("site-nav--open");
        toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    menu.addEventListener("click", function (ev) {
        if (ev.target && ev.target.closest("a")) {
            fecharMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 430) {
            fecharMenu();
        }
    });
})();
