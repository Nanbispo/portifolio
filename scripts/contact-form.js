(function () {
    "use strict";

    var DESTINO = "contato.renanjesusbispo@gmail.com";

    var form = document.getElementById("form-contato");
    if (!form) return;

    var nome = document.getElementById("contato-nome");
    var email = document.getElementById("contato-email");
    var telefone = document.getElementById("contato-telefone");
    var mensagem = document.getElementById("contato-mensagem");
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

    function mostrarInfo(texto) {
        if (!aviso) return;
        aviso.textContent = texto;
        aviso.className = "form-aviso form-aviso--info";
        aviso.hidden = false;
        aviso.setAttribute("role", "status");
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
            mostrarErro("Digite um e-mail válido.");
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
            mostrarErro("O telefone deve ter pelo menos 10 dígitos.");
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

    function montarCorpo(n, e, t, m) {
        return (
            "Nome: " +
            n +
            "\r\n" +
            "E-mail: " +
            e +
            "\r\n" +
            "Telefone: " +
            t +
            "\r\n\r\n" +
            "Mensagem:\r\n" +
            m
        );
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (!validar()) return;

        var n = nome.value.trim();
        var e = email.value.trim();
        var t = telefone.value.trim();
        var m = mensagem.value.trim();

        var assunto = "Contato pelo portfólio — " + n;
        var corpo = montarCorpo(n, e, t, m);

        var href =
            "mailto:" +
            DESTINO +
            "?subject=" +
            encodeURIComponent(assunto) +
            "&body=" +
            encodeURIComponent(corpo);

        if (submitBtn) submitBtn.disabled = true;
        mostrarInfo(
            "Abrindo seu aplicativo de e-mail… Se nada abrir, envie manualmente para " +
                DESTINO +
                "."
        );

        window.location.href = href;

        setTimeout(function () {
            if (submitBtn) submitBtn.disabled = false;
        }, 2500);
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
