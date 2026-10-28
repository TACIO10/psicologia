import { AppDemo } from "./app-demo";
import { HeroPhones } from "./hero-phones";
import { Reveal } from "./reveal";
import { OfferBar } from "./offer-bar";

// Vazio no build padrao; "/psicologia" no build do GitHub Pages.
const asset = process.env.PAGES_BASE_PATH ?? "";

const precoMensal = "47";
const precoTexto = `R$ ${precoMensal}/mês`;
// Ancoragem de valor: valor de referência de cada item. Edite em `valorMetodo`
// e no array `bonuses`; a soma é calculada sozinha.
const valorMetodo = 97;
const formatarReais = (valor: number) => `R$ ${valor.toLocaleString("pt-BR")}`;

// Cole aqui o link do checkout de R$ 47/mês. Enquanto estiver vazio, o botão
// abre o WhatsApp com a mensagem de assinatura.
const checkout47 = "";
const whatsappAssinar =
  "https://wa.me/5516992344060?text=" +
  encodeURIComponent("Olá! Quero assinar a Memória Musical para concursos de Psicologia por R$ 47/mês.");
const checkoutUrl = checkout47 || whatsappAssinar;

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
      <OfferBar parcelamento={precoTexto} />

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
              Quer passar na <strong>EBSERH, Tribunais, Prefeituras ou
              Secretarias de Saúde?</strong> Descubra como memorizar os assuntos de
              Psicologia que realmente são <strong>cobrados nas Bancas!</strong>
            </h1>
            <p className="lead">
              Comece a usar nosso app de música e pare de esquecer ou confundir leis,
              resoluções, autores e conceitos da sua prova de Psicologia.
            </p>
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
            ["11", "áreas do edital"],
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
        </div>
      </section>

      <section className="mechanism section dark">
        <div className="wrap mechanism-grid">
          <div>
            <span className="eyebrow light">O mecanismo</span>
            <h2>Você não precisa encontrar mais horas. Precisa reencontrar a matéria mais vezes.</h2>
          </div>
          <div className="mechanism-copy">
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
              <span className="eyebrow">Incluído na assinatura</span>
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
                    <small>na assinatura</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="value-stack">
            <span className="value-title">Tudo o que você recebe na assinatura</span>
            <ul>
              <li><span>Método da Memória Musical · todas as playlists de Psicologia</span><s>{formatarReais(valorMetodo)}</s></li>
              {bonuses.map((bonus) => (
                <li key={bonus.title}><span>Bônus {bonus.number} · {bonus.title}</span><s>{formatarReais(bonus.value)}</s></li>
              ))}
            </ul>
            <div className="value-total">
              <span>Somando tudo, você pagaria</span>
              <s>{formatarReais(valorMetodo + bonuses.reduce((total, bonus) => total + bonus.value, 0))}</s>
            </div>
            <div className="value-today">
              <span>Na assinatura, hoje</span>
              <strong>R$ {precoMensal}<small>/mês</small></strong>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing section" id="oferta">
        <div className="wrap">
          <div className="section-heading center">
            <span className="eyebrow">Seu acesso</span>
            <h2>Comece hoje a estudar com músicas.</h2>
            <p>Um único plano, com todo o método e todos os bônus.</p>
          </div>

          <div className="price-grid single-plan">
            <article className="price-card featured">
              <span className="price-ribbon complete-ribbon">Acesso completo</span>
              <span className="plan-tag">Assinatura mensal</span>
              <h3>Todo o método e todos os bônus</h3>
              <div className="annual-price"><small>R$</small><strong>{precoMensal}</strong><span>/mês</span></div>
              <p className="annual-payment">cobrança mensal recorrente · garantia de 7 dias</p>
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
                href={checkoutUrl}
                data-goatcounter-click="psi-checkout-47"
                data-goatcounter-title="Clique no checkout — Assinatura R$ 47/mês"
                data-goatcounter-no-session="1"
              >
                Quero assinar por R$ {precoMensal}/mês
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
                "O que é o Método da Memória Musical®?",
                "O Método da Memória Musical® é uma forma diferente de complementar seus estudos para concursos de Psicologia. Em vez de depender apenas de PDFs e videoaulas, você também revisa os conteúdos por meio de músicas criadas com base nos principais assuntos cobrados nos editais.",
              ],
              [
                "O Método da Memória Musical® substitui PDFs, videoaulas ou cursos?",
                "Não.\n\nEle foi desenvolvido para complementar sua preparação. Você continua estudando pelos materiais tradicionais e utiliza as músicas para reforçar e revisar os conteúdos de forma prática durante a rotina.",
              ],
              [
                "Serve para qual concurso de Psicologia?",
                "EBSERH, tribunais, ministérios públicos, defensorias, prefeituras (CAPS, CRAS, CREAS), secretarias de saúde, Forças Armadas, residências e outros. As playlists cobrem os eixos que mais se repetem nas provas; use sempre junto com o edital do concurso que você vai prestar.",
              ],
              [
                "Como estudar ouvindo música pode ajudar?",
                "As músicas permitem que você mantenha contato frequente com os conteúdos já estudados, aproveitando momentos em que normalmente não estaria revisando, como no carro, caminhando, fazendo tarefas de casa ou entre um atendimento e outro.",
              ],
              [
                "Eu me confundo com leis e resoluções. As músicas ajudam nisso?",
                "Sim.\n\nNúmero, ano e conteúdo de leis e resoluções (como a Lei 10.216, a Resolução CFP 06/2019 e as Leis 8.080 e 8.142) aparecem nas letras de forma repetida, justamente para separar o que costuma se misturar na hora da prova.",
              ],
              [
                "Funciona para quem trabalha atendendo pacientes?",
                "Sim.\n\nO método foi pensado para quem tem pouco tempo disponível. Como as músicas podem ser ouvidas em diferentes momentos do dia, fica mais fácil incluir revisões na rotina sem precisar passar horas extras sentada estudando.",
              ],
              [
                "Nunca consegui decorar nada com música. Mesmo assim vale a pena?",
                "Sim.\n\nVocê não precisa cantar nem ter facilidade musical. As músicas funcionam como uma ferramenta complementar de revisão. A combinação entre ritmo e repetição torna o contato com o conteúdo mais frequente e agradável.",
              ],
              [
                "As músicas são baseadas no edital?",
                "Sim.\n\nAs músicas são desenvolvidas com base nos assuntos presentes nos editais de concursos de Psicologia, com prioridade para os conteúdos mais recorrentes nas provas. Como cada concurso tem seu recorte, o método deve ser usado como complemento ao estudo direcionado pelo edital do concurso que você pretende prestar.",
              ],
              [
                "Sou recém-formada. Esse método é para mim?",
                "Sim.\n\nSe você está começando agora, as músicas ajudam a ganhar familiaridade com o vocabulário dos concursos desde o início. E, se já estuda há algum tempo, elas complementam sua rotina de revisões.",
              ],
              [
                "Tenho pouco tempo para estudar. Ainda vale a pena?",
                "Sim.\n\nUma das maiores vantagens do método é justamente permitir que você aproveite momentos do dia que normalmente seriam improdutivos para reforçar os conteúdos já estudados.",
              ],
              [
                "Posso acessar pelo celular?",
                "Sim.\n\nVocê poderá acessar a plataforma pelo celular, tablet ou computador, estudando de onde estiver.",
              ],
              [
                "O acesso é imediato?",
                "Sim.\n\nApós a confirmação do pagamento, seu acesso é liberado e você já pode começar a utilizar a plataforma.",
              ],
              [
                "Vou receber atualizações?",
                "Sempre que novos conteúdos forem adicionados dentro do período de acesso do seu plano, eles ficarão disponíveis na plataforma conforme as condições da oferta.",
              ],
              [
                "E se eu não gostar?",
                "Você conta com uma garantia de 7 dias.\n\nAssim, poderá conhecer a plataforma e decidir com tranquilidade se o Método da Memória Musical® faz sentido para a sua preparação.",
              ],
              [
                "Em quanto tempo vou perceber resultados?",
                "Cada pessoa possui uma rotina e um ritmo de aprendizado diferentes.\n\nO Método da Memória Musical® foi criado para facilitar suas revisões e complementar sua preparação, mas o desempenho em concursos depende de diversos fatores, como constância, planejamento e resolução de questões.",
              ],
              [
                "Como começo depois da compra?",
                "É simples.\n\n1. Finalize sua compra.\n2. Receba o acesso imediatamente.\n3. Entre na plataforma.\n4. Escolha a playlist do assunto que deseja revisar.\n5. Comece a estudar utilizando o Método da Memória Musical®.",
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

      <section className="whatsapp-support" aria-labelledby="whatsapp-support-title">
        <div className="wrap narrow whatsapp-support-inner">
          <span className="eyebrow">Atendimento</span>
          <h2 id="whatsapp-support-title">Ainda ficou com alguma dúvida?</h2>
          <p>Chame nosso suporte no WhatsApp. Estamos disponíveis para ajudar você antes de começar.</p>
          <a
            className="button whatsapp-button"
            href="https://wa.me/5516992344060?text=Ol%C3%A1%21%20Tenho%20d%C3%BAvidas%20sobre%20a%20Mem%C3%B3ria%20Musical%20para%20concursos%20de%20Psicologia."
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com o suporte no WhatsApp <span>→</span>
          </a>
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
