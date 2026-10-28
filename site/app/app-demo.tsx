"use client";

import { useEffect, useRef } from "react";

// Réplica da tela "Todas as faixas" do app, dentro de um celular.
// A lista rola sozinha e cada faixa toca uma prévia real de 25s
// (arquivos em public/media/previews, recortados das músicas do app).
// Prévias de 25s ficam em public/media/previews/psicologia/<arquivo>.mp3.
// Enquanto um arquivo não existir, o player avisa que a faixa está na plataforma.
const tracks: [icon: string, title: string, topic: string, file: string][] = [
  ["CEP", "Sete Princípios", "Ética Profissional", "sete-principios.mp3"],
  ["SIG", "Sigilo e Suas Exceções", "Ética Profissional", "sigilo-e-suas-excecoes.mp3"],
  ["4119", "A Lei da Profissão", "Legislação", "a-lei-da-profissao.mp3"],
  ["CFP", "Sistema Conselhos", "Legislação", "sistema-conselhos.mp3"],
  ["DOC", "Laudo ou Parecer?", "Avaliação Psicológica", "laudo-ou-parecer.mp3"],
  ["SAT", "SATEPSI", "Avaliação Psicológica", "satepsi.mp3"],
  ["AV", "Avaliação Passo a Passo", "Avaliação Psicológica", "avaliacao-passo-a-passo.mp3"],
  ["216", "Cuidado em Liberdade", "Saúde Mental", "cuidado-em-liberdade.mp3"],
  ["RAPS", "Rede de Atenção Psicossocial", "Saúde Mental", "rede-de-atencao-psicossocial.mp3"],
  ["CAPS", "Tipos de CAPS", "Saúde Mental", "tipos-de-caps.mp3"],
  ["RD", "Redução de Danos", "Saúde Mental", "reducao-de-danos.mp3"],
  ["SUS", "Princípios do SUS", "Saúde Pública", "principios-do-sus.mp3"],
  ["PTS", "Projeto Terapêutico Singular", "Saúde Pública", "projeto-terapeutico-singular.mp3"],
  ["CRAS", "CRAS e CREAS", "Assistência Social", "cras-e-creas.mp3"],
  ["PAIF", "PAIF e PAEFI", "Assistência Social", "paif-e-paefi.mp3"],
  ["FP", "Funções Psíquicas", "Psicopatologia", "funcoes-psiquicas.mp3"],
  ["DSM", "DSM e CID", "Psicopatologia", "dsm-e-cid.mp3"],
  ["Ψ", "Fases Psicossexuais", "Psicanálise", "fases-psicossexuais.mp3"],
  ["TCC", "Pensamentos Automáticos", "TCC", "pensamentos-automaticos.mp3"],
  ["PIA", "Estágios de Piaget", "Desenvolvimento", "estagios-de-piaget.mp3"],
  ["ZDP", "Zona de Desenvolvimento Proximal", "Desenvolvimento", "zona-de-desenvolvimento-proximal.mp3"],
  ["ECA", "ECA na Prática", "Psicologia Jurídica", "eca-na-pratica.mp3"],
  ["DE", "Depoimento Especial", "Psicologia Jurídica", "depoimento-especial.mp3"],
  ["R&S", "Recrutamento e Seleção", "Organizacional", "recrutamento-e-selecao.mp3"],
];

const PLAY = <path d="M7 4l13 8-13 8z" />;
const PAUSE = <path d="M6 4h4v16H6zM14 4h4v16h-4z" />;
const PLAY_HTML = '<path d="M7 4l13 8-13 8z"/>';
const PAUSE_HTML = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';

export function AppDemo({ base = "" }: { base?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends Element>(sel: string) => root.querySelector(sel) as T;
    const screen = $<HTMLDivElement>(".adm-screen");
    const app = $<HTMLDivElement>(".adm-app");
    const sc = $<HTMLDivElement>(".adm-scroller");
    const rows = [...root.querySelectorAll<HTMLDivElement>(".adm-row")];
    const player = $<HTMLDivElement>(".adm-player");
    const pic = $<HTMLSpanElement>(".adm-player .adm-ic");
    const ptitle = $<HTMLElement>(".adm-player b");
    const ptime = $<HTMLElement>(".adm-player i");
    const pbar = $<HTMLSpanElement>(".adm-bar span");
    const pp = $<HTMLButtonElement>(".adm-pp");
    const ppIcon = $<SVGSVGElement>(".adm-pp svg");
    const finger = $<HTMLDivElement>(".adm-finger");
    const cleanups: (() => void)[] = [];
    const on = (el: EventTarget, ev: string, fn: EventListener, opt?: AddEventListenerOptions) => {
      el.addEventListener(ev, fn, opt);
      cleanups.push(() => el.removeEventListener(ev, fn, opt));
    };

    // Escala o app (desenhado em 384×848, tamanho real do iPhone) para caber no celular.
    const fit = () => { app.style.transform = `scale(${screen.clientWidth / 384})`; };
    const ro = new ResizeObserver(fit);
    ro.observe(screen);
    fit();

    // ---------- Player ----------
    const audio = new Audio();
    audio.preload = "none";
    let cur = -1, paused = false, loading = false, interacted = false;
    let mode: "single" | "all" | "shuffle" = "single";
    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

    const paint = () => {
      rows.forEach((r, i) => {
        r.classList.toggle("cur", i === cur || (cur < 0 && i === 0));
        r.classList.toggle("playing", i === cur && !paused);
      });
      ppIcon.innerHTML = paused ? PLAY_HTML : PAUSE_HTML;
      pp.setAttribute("aria-label", paused ? "Continuar" : "Pausar");
    };
    const setPaused = (p: boolean) => {
      paused = p;
      if (p) audio.pause(); else audio.play().catch(() => {});
      paint();
    };
    const play = (i: number) => {
      cur = i; paused = false; loading = true;
      audio.src = `${base}/media/previews/psicologia/${tracks[i][3]}`;
      audio.play().catch(() => { paused = true; paint(); });
      pic.textContent = tracks[i][0];
      ptitle.textContent = tracks[i][1];
      ptime.textContent = "Carregando…";
      pbar.style.width = "0";
      player.classList.add("on");
      paint();
    };
    let target: number | null = null, hold = performance.now() + 1500;
    const scrollToRow = (i: number) => {
      target = Math.max(0, rows[i].offsetTop - sc.clientHeight / 2 + 41);
      hold = performance.now() + 5000;
    };
    const next = () => {
      if (mode === "all") { const n = (cur + 1) % tracks.length; play(n); scrollToRow(n); return; }
      if (mode === "shuffle") {
        let n; do { n = Math.floor(Math.random() * tracks.length); } while (n === cur);
        play(n); scrollToRow(n); return;
      }
      cur = -1; player.classList.remove("on"); pbar.style.width = "0"; paint();
    };
    rows.forEach((r, i) => on(r, "click", () => {
      interacted = true; mode = "single";
      if (i === cur) setPaused(!paused); else play(i);
    }));
    on($(".adm-playall"), "click", () => { interacted = true; mode = "all"; play(0); scrollToRow(0); });
    on($(".adm-shuffle"), "click", () => {
      interacted = true; mode = "shuffle";
      const n = Math.floor(Math.random() * tracks.length); play(n); scrollToRow(n);
    });
    on(pp, "click", () => { if (cur >= 0) setPaused(!paused); });
    on(audio, "playing", () => { loading = false; });
    on(audio, "error", () => {
      if (!audio.getAttribute("src")) return;
      loading = false; paused = true;
      ptime.textContent = "Faixa completa dentro da plataforma";
      pbar.style.width = "0";
      paint();
    });
    on(audio, "ended", next);

    // ---------- Rolagem automática ----------
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = 0, dir = 1, hovering = false, last = performance.now(), raf = 0;
    const phone = $<HTMLDivElement>(".adm-phone");
    on(phone, "pointerenter", ((e: PointerEvent) => { if (e.pointerType === "mouse") hovering = true; }) as EventListener);
    on(phone, "pointerleave", () => { hovering = false; hold = performance.now() + 800; });
    for (const ev of ["wheel", "touchstart", "pointerdown"]) {
      on(sc, ev, () => { hold = performance.now() + 4000; target = null; }, { passive: true });
    }
    // Só anima quando o celular está visível na tela.
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(root);

    const loop = (now: number) => {
      const dt = Math.min(50, now - last); last = now;
      if (cur >= 0 && !loading && !paused) {
        const d = audio.duration || 25, e = audio.currentTime || 0;
        pbar.style.width = `${(e / d) * 100}%`;
        ptime.textContent = `Prévia ${fmt(e)} / ${fmt(d)}`;
      }
      const max = sc.scrollHeight - sc.clientHeight;
      if (target !== null) {
        pos += (target - pos) * 0.12;
        if (Math.abs(target - pos) < 1) { pos = target; target = null; }
        sc.scrollTop = pos;
      } else if (visible && !reduced && !hovering && now > hold && max > 0) {
        pos += dir * dt * 0.055;
        if (pos >= max) { pos = max; dir = -1; hold = now + 1800; }
        if (pos <= 0) { pos = 0; dir = 1; hold = now + 1800; }
        sc.scrollTop = pos;
      } else pos = sc.scrollTop;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // ---------- Dedo mostrando onde tocar (some após o primeiro clique) ----------
    const timers: number[] = [];
    const tapTimer = window.setInterval(() => {
      if (interacted || reduced || hovering || !visible || document.hidden) return;
      const sr = screen.getBoundingClientRect();
      const vis = rows.filter((r) => {
        const b = r.getBoundingClientRect();
        return b.top > sr.top + sr.height * 0.12 && b.bottom < sr.bottom - sr.height * 0.12;
      });
      if (!vis.length) return;
      const r = vis[Math.floor(Math.random() * vis.length)];
      const b = (r.querySelector(".adm-pb") as HTMLElement).getBoundingClientRect();
      finger.style.left = `${b.left - sr.left + b.width / 2 - 18}px`;
      finger.style.top = `${b.top - sr.top + b.height / 2 - 18}px`;
      finger.classList.add("show");
      timers.push(
        window.setTimeout(() => { finger.classList.add("tap"); r.classList.add("flash"); }, 450),
        window.setTimeout(() => { finger.classList.remove("tap"); r.classList.remove("flash"); }, 780),
        window.setTimeout(() => finger.classList.remove("show"), 1150),
      );
    }, 3800);

    const clock = $<HTMLSpanElement>(".adm-time");
    const d = new Date();
    clock.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tapTimer);
      timers.forEach(clearTimeout);
      ro.disconnect();
      io.disconnect();
      cleanups.forEach((c) => c());
      audio.pause();
      audio.removeAttribute("src");
    };
  }, [base]);

  return (
    <div className="adm" ref={rootRef}>
      <div className="adm-phone">
        <div className="adm-screen">
          <div className="adm-app">
            <div className="adm-status">
              <span className="adm-time">12:09</span>
              <span className="adm-island" />
              <span className="adm-sicons" aria-hidden="true">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35" /></svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff"><path d="M8 12l2.6-3.2a4 4 0 00-5.2 0zM3.7 6.9a6.6 6.6 0 018.6 0l1.6-2A9.2 9.2 0 002.1 4.9zM.4 2.8a11.8 11.8 0 0115.2 0L16 2.3A12.7 12.7 0 000 2.3z" /></svg>
                <span className="adm-batt">37</span>
              </span>
            </div>

            <div className="adm-scroller">
              <div className="adm-title">Todas as faixas</div>
              <div className="adm-actions">
                <button className="adm-abtn adm-outline adm-playall" type="button">
                  <span className="adm-pc"><svg width="11" height="11" viewBox="0 0 24 24" fill="#000" aria-hidden="true"><path d="M6 3l15 9-15 9z" /></svg></span>
                  Reproduzir tudo
                </button>
                <button className="adm-abtn adm-fill adm-shuffle" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
                  Aleatório
                </button>
              </div>
              <div className="adm-list">
                {tracks.map(([icon, title, topic], i) => (
                  <div className={`adm-row${i === 0 ? " cur" : ""}`} key={title}>
                    <span className="adm-n">{i + 1}</span>
                    <span className={`adm-ic${icon.length >= 4 ? " sm" : ""}`}>{icon}</span>
                    <span className="adm-tx"><b>{title}</b><i>{topic}</i></span>
                    <button className="adm-pb" type="button" aria-label={`Ouvir ${title}`}>
                      <svg className="adm-ico-play" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{PLAY}</svg>
                      <svg className="adm-ico-pause" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{PAUSE}</svg>
                    </button>
                    <span className="adm-dots" aria-hidden="true"><s /><s /><s /></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="adm-player" aria-live="polite">
              <span className="adm-ic">Ψ</span>
              <span className="adm-ptx"><b>—</b><i>Prévia 0:00 / 0:25</i></span>
              <button className="adm-pp" type="button" aria-label="Pausar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{PAUSE}</svg>
              </button>
              <div className="adm-bar"><span /></div>
            </div>

            <nav className="adm-tabs" aria-hidden="true">
              <span className="adm-tab on"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M3 11l9-8 9 8v10H3z" /></svg>Início</span>
              <span className="adm-tab"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>Explorar</span>
              <span className="adm-tab"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 3v18M12 3v18M16 3v18" /></svg>Biblioteca</span>
            </nav>
            <div className="adm-homebar" />
          </div>
          <div className="adm-finger" />
        </div>
      </div>
    </div>
  );
}
