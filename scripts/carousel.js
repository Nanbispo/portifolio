(function () {
    "use strict";

    const projectsContainer = document.querySelector(".projects-container");
    const prevBtn = document.querySelector(".carousel-btn--prev");
    const nextBtn = document.querySelector(".carousel-btn--next");

    if (!projectsContainer || !prevBtn || !nextBtn) {
        return; // Se os elementos não existem, não faz nada
    }

    // Configuração do scroll
    const scrollAmount = 380 + 1.75 * 16; // Largura do card + gap (em pixels)

    // Função para rolar para a esquerda
    function scrollPrev() {
        projectsContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    }

    // Função para rolar para a direita
    function scrollNext() {
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    }

    // Event listeners
    prevBtn.addEventListener("click", scrollPrev);
    nextBtn.addEventListener("click", scrollNext);

    // Atualizar estado dos botões com base na posição do scroll
    function updateButtonStates() {
        const scrollLeft = projectsContainer.scrollLeft;
        const scrollWidth = projectsContainer.scrollWidth;
        const clientWidth = projectsContainer.clientWidth;

        // Desabilita botão anterior se estiver no início
        prevBtn.disabled = scrollLeft === 0;
        prevBtn.style.opacity = scrollLeft === 0 ? "0.5" : "1";
        prevBtn.style.cursor = scrollLeft === 0 ? "not-allowed" : "pointer";

        // Desabilita botão próximo se estiver no final
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10; // 10px de tolerância
        nextBtn.disabled = isAtEnd;
        nextBtn.style.opacity = isAtEnd ? "0.5" : "1";
        nextBtn.style.cursor = isAtEnd ? "not-allowed" : "pointer";
    }

    // Atualizar estado inicial dos botões
    updateButtonStates();

    // Atualizar estado dos botões ao fazer scroll
    projectsContainer.addEventListener("scroll", updateButtonStates, { passive: true });

    // Atualizar estado dos botões ao redimensionar a janela
    window.addEventListener("resize", updateButtonStates, { passive: true });

    // Suporte a teclado (setas do teclado)
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
            scrollPrev();
        } else if (e.key === "ArrowRight") {
            scrollNext();
        }
    });
})();
