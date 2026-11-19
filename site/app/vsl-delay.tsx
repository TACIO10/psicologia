"use client";

import { useEffect } from "react";

// Tudo que tem a classe "vsl-delay" fica escondido até a pessoa assistir
// SEGUNDOS de vídeo (a chamada para os planos no VSL).
//
// A contagem é feita pelo próprio player da Vturb (displayHiddenElements), que
// conta tempo de vídeo assistido. Ele revela um elemento-sinal invisível; quando
// isso acontece, liberamos a página inteira.
//
// Proteções:
// - quem já liberou uma vez (localStorage) vê tudo direto nas próximas visitas;
// - se o player não ficar pronto (bloqueador, rede ruim), a página libera pelo
//   relógio depois de SEGUNDOS, para ninguém ficar sem o botão de compra.
const SEGUNDOS = 63;
const CHAVE = "psi-vsl-liberado";
const ESPERA_PLAYER_MS = 8000;

type SmartPlayer = HTMLElement & {
  displayHiddenElements?: (s: number, sel: string[], o?: { persist?: boolean }) => void;
};

export function liberarPagina() {
  document.documentElement.classList.add("vsl-liberado");
  try {
    localStorage.setItem(CHAVE, "1");
  } catch {}
}

export function VslDelay() {
  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE)) return liberarPagina();
    } catch {}
    if (/[?&]liberar=1\b/.test(location.search)) return liberarPagina();

    const sinal = document.getElementById("vsl-sinal");
    let reloginho: number | undefined;
    let observador: MutationObserver | undefined;

    const checarSinal = () => {
      if (sinal && getComputedStyle(sinal).display !== "none") {
        liberarPagina();
        observador?.disconnect();
        window.clearTimeout(reloginho);
      }
    };

    if (sinal) {
      observador = new MutationObserver(checarSinal);
      observador.observe(sinal, { attributes: true, attributeFilter: ["style", "class"] });
    }

    const inicio = Date.now();
    // Se o player não responder, libera pelo relógio.
    const reserva = () => {
      reloginho = window.setTimeout(liberarPagina, Math.max(0, SEGUNDOS * 1000 - (Date.now() - inicio)));
    };
    const esperaPlayer = window.setTimeout(reserva, ESPERA_PLAYER_MS);

    const player = document.querySelector("vturb-smartplayer") as SmartPlayer | null;
    const aoFicarPronto = () => {
      window.clearTimeout(esperaPlayer);
      if (typeof player?.displayHiddenElements === "function") {
        player.displayHiddenElements(SEGUNDOS, ["#vsl-sinal"], { persist: true });
        checarSinal();
      } else {
        reserva();
      }
    };
    player?.addEventListener("player:ready", aoFicarPronto);

    return () => {
      player?.removeEventListener("player:ready", aoFicarPronto);
      observador?.disconnect();
      window.clearTimeout(esperaPlayer);
      window.clearTimeout(reloginho);
    };
  }, []);

  return <div id="vsl-sinal" aria-hidden="true" style={{ display: "none" }} />;
}
