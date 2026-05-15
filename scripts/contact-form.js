(function () {
    "use strict";

    var DESTINO = "contato.renanjesusbispo@gmail.com";
    var form = document.getElementById("form-contato");
    if (!form) return;

    var nome = document.getElementById("contato-nome");
    var email = document.getElementById("contato-email");
    var telefone = document.getElementById("contato-telefone");
    var mensagem = document.getElementById("contato-mensagem");
    var replyTo = document.getElementById("contato-replyto");
    var subject = document.getElementById("contato-subject");
    var aviso = document.getElementById("form-contato-aviso");
    var submitBtn = form.querySelector('button[type="submit"]');

    function limparErrosVisuais() {
        [nome, email, telefone, mensagem].forEach(function (el) {
            if (el) el.classList.remove("input-erro");
        });
        if (aviso) {
            aviso.textContent = "";
            aviso.className = "form-aviso";
            aviso.hidden = true;
            aviso.removeAttribute("role");
        }
    }

    function mostrarErro(texto) {
        if (!aviso) return;
        aviso.textContent = texto;
        aviso.className = "form-aviso form-aviso--erro";
        aviso.hidden = false;
        aviso.setAttribute("role", "alert");
    }

    function validarEmail(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    function digitosTelefone(valor) {
        return valor.replace(/\D/g, "");
    }

    function validar() {
        limparErrosVisuais();

        var n = nome ? nome.value.trim() : "";
        var e = email ? email.value.trim() : "";
        var t = telefone ? telefone.value.trim() : "";
        var m = mensagem ? mensagem.value.trim() : "";

        if (!n) {
            mostrarErro("Informe seu nome.");
            if (nome) nome.classList.add("input-erro");
            nome.focus();
            return false;
        }
        if (!e) {
            mostrarErro("Informe seu e-mail.");
            if (email) email.classList.add("input-erro");
            email.focus();
            return false;
        }
        if (!validarEmail(e)) {
            mostrarErro("Digite um e-mail valido.");
            email.classList.add("input-erro");
            email.focus();
            return false;
        }
        if (!t) {
            mostrarErro("Informe seu telefone.");
            if (telefone) telefone.classList.add("input-erro");
            telefone.focus();
            return false;
        }
        if (digitosTelefone(t).length < 10) {
            mostrarErro("O telefone deve ter pelo menos 10 digitos.");
            telefone.classList.add("input-erro");
            telefone.focus();
            return false;
        }
        if (!m) {
            mostrarErro("Escreva sua mensagem.");
            if (mensagem) mensagem.classList.add("input-erro");
            mensagem.focus();
            return false;
        }

        return true;
    }

    form.addEventListener("submit", function (ev) {
        if (!validar()) {
            ev.preventDefault();
            return;
        }

        var n = nome.value.trim();
        var e = email.value.trim();

        if (replyTo) replyTo.value = e;
        if (subject) subject.value = "Contato pelo portfolio - " + n;
        if (submitBtn) submitBtn.disabled = true;
    });

    [nome, email, telefone, mensagem].forEach(function (el) {
        if (!el) return;
        el.addEventListener("input", function () {
            el.classList.remove("input-erro");
            if (aviso && aviso.classList.contains("form-aviso--erro")) {
                aviso.hidden = true;
                aviso.textContent = "";
            }
        });
    });
})();
