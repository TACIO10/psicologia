"use client";

import { useEffect } from "react";

const playerId = "vid-6ae88ac5c7321bec2b425c92";
const playerScript =
  "https://scripts.converteai.net/f7f63c56-fc11-4d6b-889e-71d2f24f657c/players/6ae88ac5c7321bec2b425c92/v4/player.js";

export function VturbPlayer() {
  useEffect(() => {
    if (document.getElementById(`${playerId}-script`)) return;

    const script = document.createElement("script");
    script.id = `${playerId}-script`;
    script.src = playerScript;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      className="hero-video"
      aria-label="Vídeo de apresentação da Memória Musical para Psicologia"
      dangerouslySetInnerHTML={{
        __html:
          `<vturb-smartplayer id="${playerId}" style="display:block;margin:0 auto;width:100%;max-width:400px"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:177.77777777777777% 0 0;z-index:0;background-color:black"></div></vturb-smartplayer>`,
      }}
    />
  );
}
