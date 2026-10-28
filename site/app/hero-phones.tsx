// Três celulares em leque no topo da página, com telas no visual do app:
// lista de faixas (esq.), player "Tocando agora" (centro) e biblioteca (dir.).
// Só visual — o celular interativo com som fica na seção "Amostras gratuitas".

const listRows: [string, string, string][] = [
  ["BP", "Bipolar Tipo I vs. Tipo II", "Psicopatologia"],
  ["DEP", "Depressão vs. Distimia", "Psicopatologia"],
  ["TAG", "TAG vs. Pânico", "Psicopatologia"],
  ["TEPT", "Estresse Agudo vs. TEPT", "Psicopatologia"],
  ["PSI", "Linha do Tempo Psicótica", "Psicopatologia"],
  ["B", "Personalidade Cluster B", "Psicopatologia"],
  ["DSM", "Psicopatologia Geral", "Psicopatologia"],
  ["216", "Cuidado em Liberdade", "Saúde Mental"],
];

const playlists: [string, string][] = [
  ["CEP", "Ética e Legislação"],
  ["AV", "Avaliação Psicológica"],
  ["RAPS", "Saúde Mental e RAPS"],
  ["SUS", "SUS e Saúde Pública"],
  ["SUAS", "Assistência Social"],
  ["FP", "Psicopatologia"],
  ["TCC", "Teorias e Abordagens"],
  ["ECA", "Psicologia Jurídica"],
];

function StatusBar() {
  return (
    <div className="adm-status">
      <span className="adm-time">12:09</span>
      <span className="adm-island" />
      <span className="adm-sicons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35" /></svg>
        <span className="adm-batt">37</span>
      </span>
    </div>
  );
}

function Tabs({ active }: { active: number }) {
  const labels = ["Início", "Explorar", "Biblioteca"];
  const icons = [
    <path key="h" d="M3 11l9-8 9 8v10H3z" />,
    <g key="s"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></g>,
    <g key="b"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 3v18M12 3v18M16 3v18" /></g>,
  ];
  return (
    <div className="adm-tabs">
      {labels.map((label, i) => (
        <span className={`adm-tab${i === active ? " on" : ""}`} key={label}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[i]}</svg>
          {label}
        </span>
      ))}
    </div>
  );
}

export function HeroPhones() {
  return (
    <div className="hero-phones" aria-hidden="true">
      <div className="hp-glow" />

      {/* Esquerda: lista de faixas */}
      <div className="hp-phone hp-left">
        <div className="hp-screen">
          <div className="adm-app hp-app">
            <StatusBar />
            <div className="adm-scroller hp-static">
              <div className="adm-title">Todas as faixas</div>
              <div className="adm-list">
                {listRows.map(([icon, title, topic], i) => (
                  <div className={`adm-row${i === 0 ? " cur" : ""}`} key={title}>
                    <span className="adm-n">{i + 1}</span>
                    <span className="adm-ic">{icon}</span>
                    <span className="adm-tx"><b>{title}</b><i>{topic}</i></span>
                    <span className="adm-pb"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg></span>
                    <span className="adm-dots"><s /><s /><s /></span>
                  </div>
                ))}
              </div>
            </div>
            <Tabs active={0} />
            <div className="adm-homebar" />
          </div>
        </div>
      </div>

      {/* Direita: biblioteca */}
      <div className="hp-phone hp-right">
        <div className="hp-screen">
          <div className="adm-app hp-app">
            <StatusBar />
            <div className="adm-scroller hp-static">
              <div className="adm-title">Biblioteca</div>
              <div className="hp-chips"><span className="on">Playlists</span><span>Curtidas</span><span>Baixadas</span></div>
              <div className="hp-lib">
                {playlists.map(([icon, name]) => (
                  <div className="hp-tile" key={name}>
                    <span className="adm-ic">{icon}</span>
                    <b>{name}</b>
                    <i>Playlist</i>
                  </div>
                ))}
              </div>
            </div>
            <Tabs active={2} />
            <div className="adm-homebar" />
          </div>
        </div>
      </div>

      {/* Centro: tocando agora */}
      <div className="hp-phone hp-center">
        <div className="hp-screen">
          <div className="adm-app hp-app hp-now">
            <StatusBar />
            <div className="hp-now-head">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
              <span>Tocando agora</span>
              <span className="adm-dots"><s /><s /><s /></span>
            </div>
            <div className="hp-cover">
              <span className="hp-cover-ring" />
              <span className="hp-cover-ic">BP</span>
              <span className="hp-cover-bars"><i /><i /><i /><i /><i /><i /><i /></span>
            </div>
            <div className="hp-now-meta">
              <div>
                <b>Bipolar I vs. II</b>
                <i>Psicopatologia · DSM-5-TR</i>
              </div>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#1fd36b"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>
            </div>
            <div className="hp-progress"><span /></div>
            <div className="hp-times"><span>0:41</span><span>1:34</span></div>
            <div className="hp-controls">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fd36b" strokeWidth="2" strokeLinecap="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M18 18 8 12l10-6v12ZM6 6h2v12H6z" /></svg>
              <span className="hp-play"><svg width="30" height="30" viewBox="0 0 24 24" fill="#04210f"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg></span>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="m6 6 10 6-10 6V6ZM16 6h2v12h-2z" /></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="m17 1 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" /></svg>
            </div>
            <div className="hp-next">
              <span className="adm-ic">DEP</span>
              <span><i>A seguir</i><b>Depressão vs. Distimia</b></span>
            </div>
            <div className="adm-homebar" />
          </div>
        </div>
      </div>

      <div className="floating-card">
        <span className="sound-bars"><i /><i /><i /><i /><i /></span>
        <div>
          <small>Agora tocando</small>
          <strong>Bipolar Tipo I vs. Tipo II</strong>
        </div>
      </div>
    </div>
  );
}
