import { AppDemo } from "./app-demo";
import { HeroPhones } from "./hero-phones";
import { Reveal } from "./reveal";
import { OfferBar } from "./offer-bar";
import { VturbPlayer } from "./vturb-player";
import { partesDoTitulo, varianteAtual } from "./headlines";

// Vazio no build padrao; "/psicologia" no build do GitHub Pages.
const asset = process.env.PAGES_BASE_PATH ?? "";

const precoMensal = "47";
const precoAnualMensal = "20,37";
const precoAnualVista = "197";
const parcelamentoAnual = `12x R$ ${precoAnualMensal}`;

const testimonials = [
  {
    image: `${asset}/media/depoimento-marcia.webp`,
    alt: "Depoimento de aluna psicóloga que passou a fixar os artigos de Ética ouvindo as músicas no carro",
  },
  {
    image: `${asset}/media/depoimento-didda.webp`,
    alt: "Depoimento de aluna que parou de confundir as abordagens e os autores com uma música por autor",
  },
  {
    image: `${asset}/media/depoimento-denise.webp`,
    alt: "Depoimento de aluna que aproveita trânsito e academia para revisar cerca de 50 minutos por dia",
  },
];
// Ancoragem de valor: valor de referência de cada item. Edite em `valorMetodo`
// e no array `bonuses`; a soma é calculada sozinha.
const valorMetodo = 97;
// Bloco "a letra é o conteúdo". Cole em `trecho` um pedaço REAL da letra da faixa;
// enquanto estiver vazio, o bloco não aparece na página. Marque entre *asteriscos*
// as palavras que se repetem nos dois textos.
const letraProva = {
  faixa: "Cuidado em Liberdade",
  trecho: "",
  fonte: "Lei 10.216/2001 · Art. 4º",
  original:
    "A *internação*, em qualquer de suas modalidades, só será indicada quando os *recursos extra-hospitalares* se mostrarem *insuficientes*.",
};
const destacar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\*([^*]+)\*/g, "<mark>$1</mark>");

const formatarReais = (valor: number) => `R$ ${valor.toLocaleString("pt-BR")}`;

// Cole aqui o link do checkout de R$ 47/mês. Enquanto estiver vazio, o botão
// abre o WhatsApp com a mensagem de assinatura.
const checkoutMensal = "https://checkout.payt.com.br/b17b60c3521a34527a4c49d7173e4fa4";
const checkoutAnual = "https://checkout.payt.com.br/d046eb98258b957a424c4693ae5bdcff";
const whatsappAssinar =
  "https://wa.me/5516992344060?text=" +
  encodeURIComponent("Olá! Quero assinar a Memória Musical para concursos de Psicologia por R$ 47/mês.");
const urlMensal = checkoutMensal || whatsappAssinar;
const urlAnual = checkoutAnual || whatsappAssinar;

const subjects = [
  { title: "Ética e Legislação Profissional", text: "O tema que aparece em praticamente todo edital, e onde pequenos detalhes decidem a questão.", topics: ["Código de Ética (Res. CFP 010/2005)", "Princípios fundamentais", "Lei 4.119/1962", "Lei 5.766/1971 e Sistema Conselhos", "Sigilo e suas exceções"] },
  { title: "Avaliação Psicológica e Documentos", text: "Normas, instrumentos e documentos que a banca adora comparar.", topics: ["Res. CFP 31/2022", "SATEPSI", "Res. CFP 06/2019 · documentos escritos", "Psicodiagnóstico", "Testes psicológicos"] },
  { title: "Saúde Mental e RAPS", text: "Reforma Psiquiátrica e a rede que mais contrata psicólogos no serviço público.", topics: ["Lei 10.216/2001", "RAPS (Portaria 3.088/2011)", "Tipos de CAPS", "Redução de danos", "Matriciamento"] },
  { title: "Sistema Único de Saúde (SUS)", text: "A base de qualquer concurso na área da saúde, em faixas para ouvir e repetir.", topics: ["Leis 8.080 e 8.142/1990", "Princípios e diretrizes", "Atenção Primária", "Política Nacional de Humanização", "Clínica ampliada e PTS"] },
  { title: "Assistência Social (SUAS)", text: "Para prefeituras e secretarias: proteção social e o papel do psicólogo.", topics: ["LOAS (Lei 8.742/1993)", "CRAS e CREAS", "PAIF e PAEFI", "Proteção básica e especial", "Trabalho social com famílias"] },
  { title: "Psicopatologia", text: "Funções psíquicas, quadros clínicos e classificações para reconhecer rápido na prova.", topics: ["Funções psíquicas", "Transtornos do humor e de ansiedade", "Psicoses", "DSM e CID", "Psicopatologia psicanalítica"] },
  { title: "Teorias e Abordagens", text: "Autores, conceitos e diferenças entre abordagens, onde mais aparecem alternativas parecidas.", topics: ["Psicanálise", "Análise do Comportamento", "TCC", "Humanismo e Gestalt", "Psicologia histórico-cultural"] },
  { title: "Desenvolvimento Humano", text: "Das fases do desenvolvimento aos autores clássicos.", topics: ["Piaget", "Vygotsky", "Fases psicossexuais", "Erikson", "Adolescência e envelhecimento"] },
  { title: "Psicologia Jurídica", text: "Para tribunais, ministérios públicos, defensorias e sistema prisional.", topics: ["ECA (Lei 8.069/1990)", "Lei 13.431/2017 · escuta especializada", "Perícia psicológica", "Alienação parental", "Medidas socioeducativas"] },
  { title: "Psicologia Organizacional e do Trabalho", text: "Para editais com foco em gestão de pessoas e saúde do trabalhador.", topics: ["Recrutamento e seleção", "Treinamento e desenvolvimento", "Clima e cultura", "Saúde do trabalhador", "Avaliação de desempenho"] },
  { title: "Psicologia Escolar e Social", text: "Educação, grupos e processos sociais.", topics: ["Psicologia escolar crítica", "Dificuldades de aprendizagem", "Processos grupais", "Psicologia comunitária", "Inclusão"] },
  { title: "Conhecimentos Complementares", status: "Playlist em constante atualização", text: "Além dos temas principais, você terá acesso a novas playlists adicionadas conforme os editais forem sendo publicados.", topics: ["Políticas públicas de saúde", "Saúde do trabalhador", "Psicologia hospitalar", "Psicologia do esporte", "Psicologia do trânsito", "Políticas sobre drogas", "Saúde da criança e do adolescente", "Envelhecimento e cuidado", "Violência e rede de proteção"] },
];

// Todos os assuntos dos módulos, divididos em três faixas deslizantes.
const allTopics = [...new Set(subjects.flatMap((subject) => subject.topics))];
const marqueeTopics = [0, 1, 2].map((row) => allTopics.filter((_, index) => index % 3 === row));


const bonuses = [
  {
    number: "01",
    value: 37,
    title: "Checklist dos assuntos mais cobrados",
    text: "Saiba o que priorizar e acompanhe sua evolução pelos temas com maior incidência.",
    image: `${asset}/media/bonus-checklist.webp`,
  },
  {
    number: "02",
    value: 47,
    title: "Banco de questões comentadas",
    text: "Pratique após cada revisão com questões organizadas por disciplina.",
    image: `${asset}/media/bonus-questoes.webp`,
  },
  {
    number: "03",
    value: 27,
    title: "Comunidade exclusiva de alunos",
    text: "Troque experiências, tire dúvidas e acompanhe as novidades do método.",
    image: `${asset}/media/bonus-comunidade.webp`,
  },
  {
    number: "04",
    value: 27,
    title: "Letras comentadas",
    text: "A letra de cada música com os trechos-chave destacados e o conceito explicado.",
    image: `${asset}/media/bonus-letras.webp`,
  },
  {
    number: "05",
    value: 27,
    title: "Cronograma de 30 dias até a prova",
    text: "O que ouvir em cada dia, com revisões espaçadas para fixar o conteúdo.",
    image: `${asset}/media/bonus-cronograma.webp`,
  },
];

export default function Home() {
  return (
    <main>
      <Reveal />
      <OfferBar parcelamento={parcelamentoAnual} />

      <section className="hero" id="inicio">
        <nav className="nav wrap">
          <a className="brand" href="#inicio" aria-label="Memória Musical — início">
            <span className="brand-mark">♪</span>
            <span>MEMÓRIA MUSICAL</span>
          </a>
          <a className="nav-link" href="#oferta">Ver planos</a>
        </nav>

        <div className="hero-grid wrap">
          <div className="hero-copy">
            <h1>
              {partesDoTitulo(varianteAtual.titulo).map((parte, i) =>
                parte.destaque ? (
                  <strong key={i}>{parte.texto}</strong>
                ) : (
                  <span key={i}>{parte.texto}</span>
                ),
              )}
            </h1>
            <p className="lead">{varianteAtual.subtitulo}</p>
            <VturbPlayer />
            <div className="hero-actions">
              <button className="button primary" type="button" data-price-jump>
                <span aria-hidden="true">▶</span> Quero memorizar ouvindo música · Acesso imediato
              </button>
              <span className="microcopy">Garantia de 7 dias · Comece hoje</span>
            </div>
            <div className="hero-proof">
              <span>✓ Acesso imediato</span>
              <span>✓ Celular e computador</span>
              <span>✓ Garantia de 7 dias</span>
            </div>
          </div>

          <div className="hero-visual">
            <HeroPhones />
          </div>
        </div>
      </section>

      <section className="stats" aria-label="O que você recebe">
        <div className="wrap stats-grid">
          {[
            ["+1.000", "músicas educativas"],
            ["12", "áreas do edital"],
            ["Celular", "e computador"],
            ["Imediato", "acesso após a compra"],
            ["7 dias", "de garantia"],
          ].map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials section soft">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Experiência de alunas</span>
            <h2>Veja os relatos de quem incluiu as músicas na rotina.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(({ image, alt }) => (
              <figure key={image}>
                <img
                  src={image}
                  alt={alt}
                  width="853"
                  height="1516"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="problem section">
        <div className="wrap narrow">
          <span className="eyebrow">A frustração é conhecida</span>
          <h2>Você estudou. Mas, na prova, a resposta simplesmente não veio.</h2>
          <p className="section-intro">
            Lei 10.216 ou 8.080? Laudo ou parecer? CRAS ou CREAS? Você leu tudo,
            mas na alternativa as normas, os autores e as abordagens se misturam.
            O problema quase nunca é falta de estudo: é encontrar tempo e energia
            para reencontrar a matéria vezes suficientes para ela ficar acessível.
          </p>
          <p className="no-blame">
            Você sabia a resposta. E, na prova, ela não veio. Isso não é falta de
            capacidade: é conteúdo demais, lido cansada, sem nada que puxe ele de volta.
          </p>
        </div>
      </section>

      <section className="mechanism section dark">
        <div className="wrap mechanism-grid">
          <div>
            <span className="eyebrow light">O mecanismo</span>
            <h2>Você não precisa encontrar mais horas. Precisa reencontrar a matéria mais vezes.</h2>
          </div>
          <div className="mechanism-copy">
            <div className="refrao">
              <span>O Efeito Refrão</span>
              <p>
                Você sabe de cor aquela música que nunca quis decorar. Ninguém sentou
                pra estudar ela: ela grudou porque repetiu com ritmo. O Memória Musical
                usa isso a seu favor. A letra é o conteúdo: Lei 10.216, CRAS e CREAS,
                critérios do DSM. Quando o refrão volta na sua cabeça, a matéria volta junto.
              </p>
            </div>
            <p>
              O Método da Memória Musical transforma conteúdos recorrentes dos
              concursos de Psicologia em faixas organizadas por disciplina.
            </p>
            <p>
              Assim, sua revisão pode continuar no trânsito, entre um atendimento
              e outro, caminhando ou cuidando da casa — sem substituir seu estudo
              principal.
            </p>
          </div>
          <div className="routine-strip">
            {["Estude", "Dê o play", "Reencontre", "Reconheça"].map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {letraProva.trecho && (
        <section className="proof section" aria-labelledby="prova-title">
          <div className="wrap">
            <div className="section-heading center">
              <span className="eyebrow">A letra é o conteúdo</span>
              <h2 id="prova-title">Aqui você não estuda com música. A música é o estudo.</h2>
              <p>Compare o trecho da faixa com o texto original. As palavras destacadas são as mesmas.</p>
            </div>
            <div className="proof-grid">
              <figure className="proof-card lyric">
                <span className="proof-tag">♪ Trecho da faixa · {letraProva.faixa}</span>
                <blockquote dangerouslySetInnerHTML={{ __html: destacar(letraProva.trecho) }} />
              </figure>
              <figure className="proof-card source">
                <span className="proof-tag">{letraProva.fonte}</span>
                <blockquote dangerouslySetInnerHTML={{ __html: destacar(letraProva.original) }} />
              </figure>
            </div>
            <p className="proof-note">Exemplo do bônus Letras comentadas, incluído no plano anual.</p>
          </div>
        </section>
      )}

      <section className="listen section" id="experimente">
        <div className="wrap narrow">
          <div className="section-heading center listen-heading">
            <span className="eyebrow light">Amostras gratuitas</span>
            <h2>Ouça agora. Sem cadastro, sem compromisso.</h2>
            <p>Estas são faixas reais do método, da playlist de Psicopatologia (DSM‑5‑TR). Toque em uma e comprove você mesma.</p>
          </div>

          <AppDemo base={asset} />
        </div>
      </section>

      <section className="fit section">
        <div className="wrap fit-grid">
          <div className="fit-visual">
            <img src={`${asset}/media/fernanda-virada.webp`} alt="Fones de ouvido sobre materiais de estudo" loading="lazy" decoding="async" />
            <div className="time-badge"><strong>20</strong><span>minutos<br />por dia</span></div>
          </div>
          <div>
            <span className="eyebrow">Feito para a rotina real</span>
            <h2>Revise até quando você não está “sentada para estudar”.</h2>
            <div className="use-list">
              {[
                ["No trânsito", "Transforme o deslocamento em revisão."],
                ["Entre atendimentos", "Use o intervalo entre pacientes para reencontrar um tema."],
                ["Nas tarefas", "Continue ouvindo enquanto cuida da rotina."],
                ["Na caminhada", "Movimente o corpo sem abandonar o conteúdo."],
              ].map(([title, text], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <p><strong>{title}</strong>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contents section" id="conteudos">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Dentro da plataforma</span>
            <h2>Os temas que mais aparecem nos editais, prontos para acompanhar você.</h2>
          </div>
        </div>
        <div className="topic-marquee" aria-hidden="true">
          {[0, 1, 2].map((row) => (
            <div className={`marquee-row ${row % 2 ? "reverse" : ""}`} key={row}>
              <div className="marquee-track">
                {[...marqueeTopics[row], ...marqueeTopics[row]].map((topic, index) => (
                  <span className={`pill ${(index + row) % 3 === 0 ? "pill-on" : ""}`} key={`${topic}-${index}`}>
                    {(index + row) % 3 === 0 ? "+ " : ""}{topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="wrap">
          <div className="subject-grid">
            {subjects.map((subject, index) => (
              <details key={subject.title} className="subject-card">
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{subject.title}</strong>
                  <small>Ver o que você vai revisar <b>+</b></small>
                </summary>
                <div className="subject-details">
                  <div className="subject-copy">
                    <strong className="playlist-status">{subject.status || "Playlist disponível"}</strong>
                    <p>{subject.text}</p>
                    <h4>{index === 11 ? "Você recebe atualizações com assuntos como:" : "Você vai revisar:"}</h4>
                    <ul>{subject.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                    <div className="subject-value">Este é apenas um dos módulos disponíveis. Na assinatura você libera acesso a todas as playlists e às futuras atualizações dos editais.</div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="concursos section soft" aria-labelledby="concursos-title">
        <div className="wrap narrow">
          <div className="section-heading center">
            <span className="eyebrow">Para quais concursos?</span>
            <h2 id="concursos-title">O Memória Musical serve para a sua preparação em Psicologia.</h2>
            <p>Desenvolvido para quem está se preparando para concursos e processos seletivos de Psicologia em todo o Brasil.</p>
          </div>
          <div className="concursos-list" role="list" aria-label="Concursos e processos seletivos atendidos">
            {[
              "EBSERH / HU Brasil",
              "Tribunais de Justiça e TRTs",
              "Ministérios Públicos e Defensorias",
              "Prefeituras Municipais — CAPS, CRAS, CREAS e escolas",
              "Secretarias Estaduais de Saúde (SES)",
              "Secretarias Municipais de Saúde (SMS)",
              "Forças Armadas — Oficial Psicólogo",
              "Polícia Militar e Corpo de Bombeiros — Área da Saúde",
              "Sistema Prisional e Socioeducativo",
              "Universidades e Institutos Federais",
              "Residências Multiprofissionais",
            ].map((concurso) => (
              <p key={concurso} role="listitem">✓ {concurso}</p>
            ))}
          </div>
          <p className="concursos-note">E muitos outros concursos da área da Psicologia.</p>
        </div>
      </section>

      <section className="comparison section dark">
        <div className="wrap">
          <div className="section-heading center light-heading">
            <span className="eyebrow light">Menos atrito, mais frequência</span>
            <h2>Qual revisão tem mais chance de caber no seu dia?</h2>
          </div>
          <div className="compare-grid">
            <article className="compare-old">
              <span className="compare-label">Revisão tradicional</span>
              <h3>Depende de parar tudo.</h3>
              <ul>
                <li>× PDFs extensos para reler</li>
                <li>× Mais tempo diante da tela</li>
                <li>× Difícil manter todos os dias</li>
                <li>× Revisões deixadas para depois</li>
              </ul>
            </article>
            <article className="compare-new">
              <span className="compare-label">Memória Musical</span>
              <h3>Acompanha o que você já faz.</h3>
              <ul>
                <li>✓ Faixas rápidas por disciplina</li>
                <li>✓ Ouça pelo celular</li>
                <li>✓ Mais contato com os conteúdos</li>
                <li>✓ Fácil de repetir na rotina</li>
              </ul>
            </article>
          </div>
          <p className="disclaimer-inline">
            O método é complementar: não substitui aulas, leitura ou resolução de questões.
          </p>
        </div>
      </section>

      <section className="bonuses section">
        <div className="wrap">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Incluído no plano anual</span>
              <h2>5 bônus para transformar revisão em preparação.</h2>
            </div>
            <p>Ouça, entenda cada letra, siga o cronograma, pratique e mantenha o ritmo com outros alunos.</p>
          </div>
          <div className="bonus-grid">
            {bonuses.map((bonus) => (
              <article key={bonus.title}>
                <img src={bonus.image} alt={`Prévia do bônus: ${bonus.title}`} width="1120" height="800" loading="lazy" decoding="async" />
                <div className="bonus-copy">
                  <span>Bônus {bonus.number}</span>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.text}</p>
                  <div className="bonus-price">
                    <s>De {formatarReais(bonus.value)}</s>
                    <strong>por R$ 0</strong>
                    <small>no plano anual</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="value-stack">
            <span className="value-title">Faça a conta do ano</span>
            <ul>
              <li><span>12 meses no plano mensal (12 × R$ {precoMensal})</span><s>{formatarReais(12 * Number(precoMensal))}</s></li>
              {bonuses.map((bonus) => (
                <li key={bonus.title}><span>Bônus {bonus.number} · {bonus.title}</span><s>{formatarReais(bonus.value)}</s></li>
              ))}
            </ul>
            <div className="value-total">
              <span>No anual: R$ {precoAnualVista}, com os 5 bônus</span>
              <strong>{`12x R$ ${precoAnualMensal}`}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="desire" aria-label="Por que você faz concurso">
        <div className="wrap narrow">
          <p>
            Exercer a Psicologia com <strong>salário que cai todo mês</strong>, no CAPS,
            no hospital, na prefeitura, sem largar o que você ama.
          </p>
        </div>
      </section>

      <section className="pricing section" id="oferta">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Escolha seu acesso</span>
            <h2>Comece hoje a estudar com músicas.</h2>
            <p>Dois jeitos de começar. Os bônus vêm no plano anual.</p>
          </div>

          <div className="price-grid">
            <article className="price-card essential-plan">
              <span className="price-ribbon essential-ribbon">Para começar</span>
              <span className="plan-tag">Assinatura mensal</span>
              <h3>Acesso ao Método da Memória Musical</h3>
              <div className="annual-price"><small>R$</small><strong>{precoMensal}</strong><span>/mês</span></div>
              <p className="annual-payment">cobrança mensal recorrente · garantia de 7 dias</p>
              <ul>
                <li>✓ Todas as playlists de Psicologia</li>
                <li>✓ Conteúdos para concursos e Residência</li>
                <li>✓ Acesso pelo celular e computador</li>
              </ul>
              <a
                className="button price-button essential-button"
                href={urlMensal}
                data-goatcounter-click="psi-checkout-mensal-47"
                data-goatcounter-title="Clique no checkout — Assinatura R$ 47/mês"
                data-goatcounter-no-session="1"
              >
                Assinar mensal por R$ {precoMensal}
              </a>
            </article>

            <article className="price-card featured">
              <span className="price-ribbon complete-ribbon">Melhor escolha</span>
              <span className="plan-tag">Anual · Plano Completo</span>
              <h3>Todo o método e todos os bônus</h3>
              <div className="annual-price"><small>R$</small><strong>{precoAnualMensal}</strong><span>/mês</span></div>
              <p className="annual-payment">{`12x de R$ ${precoAnualMensal} no cartão · ou R$ ${precoAnualVista} à vista`}</p>
              <span className="value-badge">Os 5 bônus inclusos</span>
              <ul>
                <li>✓ Todas as playlists de Psicologia</li>
                <li>✓ Conteúdos para concursos e Residência</li>
                <li>✓ Novas músicas e temas adicionados constantemente</li>
                <li>✓ Acesso pelo celular e computador</li>
                <li>✓ Checklist dos assuntos mais cobrados</li>
                <li>✓ Banco de questões comentadas</li>
                <li>✓ Comunidade exclusiva de alunos</li>
                <li>✓ Letras comentadas</li>
                <li>✓ Cronograma de 30 dias até a prova</li>
                <li>✓ Suporte prioritário</li>
              </ul>
              <a
                className="button primary price-button"
                href={urlAnual}
                data-goatcounter-click="psi-checkout-anual-197"
                data-goatcounter-title="Clique no checkout — Plano Anual R$ 197"
                data-goatcounter-no-session="1"
              >
                Quero o Plano Completo
              </a>
            </article>
          </div>
          <p className="secure-note">🔒 Compra segura · Liberação imediata · Garantia de 7 dias</p>
        </div>
      </section>

      <section className="guarantee section dark">
        <div className="wrap guarantee-grid">
          <div className="guarantee-seal"><strong>7</strong><span>DIAS</span></div>
          <div>
            <span className="eyebrow light">Risco reduzido</span>
            <h2>Ouça, explore e veja se o método cabe na sua rotina.</h2>
            <p>
              Você tem 7 dias para experimentar. Se perceber que o Método da
              Memória Musical não faz sentido para você, basta solicitar o reembolso.
            </p>
            <strong>O risco fica do nosso lado.</strong>
          </div>
        </div>
      </section>

      <section className="faq section">
        <div className="wrap narrow">
          <div className="section-heading">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Antes de dar o play, tire suas dúvidas.</h2>
          </div>
          <div className="faq-list">
            {[
              [
                "O que é o Memória Musical para concursos de Psicologia?",
                "É um aplicativo com músicas feitas a partir do que mais cai nos concursos de Psicologia. A letra é o próprio conteúdo: leis, resoluções, autores e critérios do DSM. Você dá o play e revisa em qualquer momento do dia.",
              ],
              [
                "O que está incluído no acesso?",
                "Todas as músicas e playlists de Psicologia do catálogo, no celular e no computador. No plano anual você também leva os 5 bônus: checklist dos assuntos mais cobrados, banco de questões comentadas, comunidade de alunos, letras comentadas e cronograma de 30 dias.",
              ],
              [
                "Para quais concursos o Memória Musical serve?",
                "Para cargos de Psicologia na saúde (EBSERH, secretarias, CAPS), tribunais, prefeituras e outros órgãos públicos. Como cada edital tem seu recorte, compare os temas do app com o edital do seu concurso.",
              ],
              [
                "As músicas cobrem todo o conteúdo do meu edital?",
                "Não necessariamente. O catálogo reúne os temas listados nesta página, que são os que mais se repetem nas provas. Cada concurso pode cobrar algo a mais, então acompanhe sempre o edital oficial.",
              ],
              [
                "Isso não é coisa de ENEM? Não é infantil?",
                "Não. As letras trazem o conteúdo no nível do concurso: número e ano de lei, artigo de resolução, critério diagnóstico do DSM‑5‑TR. O formato é leve, mas o que você revisa é exatamente o que a banca cobra.",
              ],
              [
                "Música não atrapalha a concentração?",
                "Aqui você não estuda com música de fundo. A música é o estudo: a letra é o conteúdo. Você não divide a atenção entre duas coisas, porque o que você está ouvindo é a própria matéria.",
              ],
              [
                "Como estudar ouvindo música pode ajudar?",
                "Pelo mesmo motivo que você sabe de cor aquela música que nunca quis decorar: ritmo e repetição fazem o conteúdo grudar. Quando o refrão volta na cabeça, a matéria volta junto. Cada pessoa tem seu ritmo, e o app complementa o seu estudo, sem prometer aprovação.",
              ],
              [
                "Serve pra mim? Tenho TDAH, ou tenho mais de 40 anos.",
                "Serve como ferramenta de revisão para qualquer pessoa que estuda para concurso, em qualquer idade. Faixas curtas, que você pode repetir quantas vezes quiser, costumam ser mais fáceis de encaixar na rotina do que blocos longos de leitura. Se você tem TDAH, use o app como complemento ao acompanhamento e ao método que já funcionam para você.",
              ],
              [
                "Preciso saber cantar ou ter facilidade para memorizar músicas?",
                "Não. Você não precisa cantar nem ter experiência musical. É só ouvir as faixas.",
              ],
              [
                "Tenho pouco tempo e trabalho atendendo pacientes. Ainda posso usar?",
                "Sim, foi pensado para isso. Você ouve no trânsito, em casa ou entre um atendimento e outro, sem precisar de um horário só para abrir os materiais.",
              ],
              [
                "Posso usar pelo celular e pelo computador?",
                "Sim. E dá para ouvir com a tela bloqueada.",
              ],
              [
                "Preciso de internet para ouvir as músicas?",
                "Não. Você pode ouvir as músicas sem estar conectada à internet.",
              ],
              [
                "Quando recebo o acesso?",
                "Logo depois que o pagamento é confirmado. As instruções chegam no seu e-mail; se não encontrar, olhe também a caixa de spam.",
              ],
              [
                "Por quanto tempo tenho acesso? A cobrança se renova?",
                "O mensal renova automaticamente todo mês, por R$ 47. O anual vale por 12 meses: R$ 197 à vista ou 12x de R$ 20,37.",
              ],
              [
                "O conteúdo recebe atualizações?",
                "Sim. Novas músicas e temas entram no catálogo e ficam disponíveis enquanto o seu plano estiver ativo.",
              ],
              [
                "E se eu comprar e não gostar?",
                "Você tem 7 dias de garantia. Se não fizer sentido para você, peça o reembolso dentro desse prazo.",
              ],
              [
                "Em quanto tempo vou perceber resultados?",
                "Depende da sua rotina e da sua preparação. Quanto mais vezes você reencontra a matéria, mais fácil ela volta na prova. O app é um complemento ao seu estudo e não garante aprovação.",
              ],
              [
                "Como começo depois da compra?",
                "Entre no app com as instruções que chegam no seu e-mail, escolha a playlist do tema que você está estudando e dê play.",
              ],
            ].map(([question, answer], index) => (
              <details key={question}>
                <summary>{`${index + 1}. ${question}`}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footer-inner">
          <a className="brand" href="#inicio"><span className="brand-mark">♪</span><span>MEMÓRIA MUSICAL</span></a>
          <p>© 2026 Método da Memória Musical. Todos os direitos reservados.</p>
          <p className="legal">Este produto é um recurso complementar de revisão e não garante aprovação. Resultados variam conforme dedicação, rotina de estudos e outros fatores individuais.</p>
        </div>
      </footer>
    </main>
  );
}
