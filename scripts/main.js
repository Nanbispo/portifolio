(() => {
  "use strict";
  const d = document, r = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];

  // Tema (o valor inicial é definido no <head> para evitar flash)
  $(".theme-toggle")?.addEventListener("click", () => {
    const t = r.dataset.theme === "dark" ? "light" : "dark";
    r.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  });

  // Reveal on scroll, com escalonamento entre irmãos
  const reveal = new IntersectionObserver((es, o) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); o.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal]").forEach(el => {
    const irmaos = [...el.parentElement.children].filter(n => n.hasAttribute("data-reveal"));
    el.style.setProperty("--i", Math.min(irmaos.indexOf(el), 4));
    reveal.observe(el);
  });

  // Scrollspy: marca o link da seção visível
  const links = $$(".site-nav__menu a");
  const porId = new Map(links.map(a => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.removeAttribute("aria-current"));
    porId.get(e.target.id)?.setAttribute("aria-current", "true");
  }), { rootMargin: "-45% 0px -50% 0px" });
  porId.forEach((_, id) => { const s = d.getElementById(id); if (s) spy.observe(s); });

  // Header (esconde ao descer, volta ao subir), barra de progresso e linha da timeline
  const header = $(".site-header"), nav = $(".site-nav"), bar = $(".progress"), tl = $(".timeline");
  let last = scrollY, hide = false, tick = false;
  const onScroll = () => {
    tick = false;
    const y = scrollY, max = r.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("is-scrolled", y > 12);
    if (Math.abs(y - last) > 4) { hide = y > last && y > 480; last = y; }
    header.classList.toggle("is-hidden", hide && !nav.classList.contains("site-nav--open"));
    if (tl) {
      const b = tl.getBoundingClientRect();
      tl.style.setProperty("--tl", Math.min(1, Math.max(0, (innerHeight * 0.7 - b.top) / b.height)));
    }
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Menu mobile
  const toggle = $(".site-nav__toggle");
  const setMenu = aberto => {
    nav.classList.toggle("site-nav--open", aberto);
    toggle.setAttribute("aria-expanded", aberto);
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("site-nav--open")));
  $(".site-nav__menu").addEventListener("click", e => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
  addEventListener("resize", () => innerWidth > 760 && setMenu(false));

  // Máscara de telefone e ano do rodapé
  $("#contato-telefone")?.addEventListener("input", e => {
    const n = e.target.value.replace(/\D/g, "").slice(0, 11);
    e.target.value = n.length > 10 ? n.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
      : n.length > 6 ? n.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      : n.length > 2 ? n.replace(/(\d{2})(\d*)/, "($1) $2") : n;
  });
  const ano = $("#ano"); if (ano) ano.textContent = new Date().getFullYear();
})();
