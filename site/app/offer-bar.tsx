"use client";

import { useEffect, useState } from "react";

const DURACAO_MINUTOS = 15;

function formatar(totalSegundos: number) {
  const m = Math.floor(totalSegundos / 60);
  const s = totalSegundos % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OfferBar({ parcelamento }: { parcelamento: string }) {
  // Comeca ja em 15:00 no servidor para o HTML inicial bater com a
  // hidratacao; a contagem so anda depois que o componente monta.
  const [restante, setRestante] = useState(DURACAO_MINUTOS * 60);

  useEffect(() => {
    const fim = Date.now() + DURACAO_MINUTOS * 60 * 1000;
    const tick = () =>
      setRestante(Math.max(0, Math.round((fim - Date.now()) / 1000)));

    tick();
    // Ancorado em Date.now() em vez de decrementar um contador: se a aba
    // ficar em segundo plano o navegador atrasa o intervalo, e um contador
    // simples dessincronizaria do relogio.
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <a
      className="offer-bar"
      href="#oferta"
      aria-label={`Oferta por tempo limitado: Plano Anual por ${parcelamento}. Ver planos.`}
    >
      <span className="offer-bar-inner">
        <span aria-hidden="true">🔥</span>
        <span>Oferta encerra em</span>
        <span className="offer-clock">{formatar(restante)}</span>
        <span className="offer-sep" aria-hidden="true">·</span>
        <span>
          <span className="offer-plan">Plano Anual por </span>
          <strong>{parcelamento}</strong>
        </span>
      </span>
    </a>
  );
}
