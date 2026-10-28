"use client";

import { useEffect } from "react";

// Faz blocos da página surgirem suavemente ao rolar. Sem JavaScript (ou com
// "reduzir movimento" ligado) tudo continua visível normalmente.
const SELECTOR = [
  ".section-heading",
  ".routine-strip > div",
  ".mechanism-copy",
  ".use-list > div",
  ".fit-visual",
  ".subject-card",
  ".concursos-list",
  ".compare-grid article",
  ".bonus-grid article",
  ".price-card",
  ".guarantee-grid > *",
  ".faq-list details",
  ".stat",
].join(",");

export function Reveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const items = [...document.querySelectorAll<HTMLElement>(SELECTOR)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => {
      // Irmãos em grade entram em cascata.
      const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty("--rv-delay", `${Math.min(index, 6) * 70}ms`);
      el.classList.add("rv");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
