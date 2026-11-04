// Gera as quatro paginas do teste de headline a partir deste mesmo codigo.
//
//   cd site && node build-variantes.mjs
//
// A principal vai para a raiz do repositorio e as outras para b/, c/ e d/.
// Os arquivos de imagem, musica e JS ficam numa copia so, na raiz, porque os
// caminhos sao absolutos (/psicologia/...). Entao cada variacao a mais custa
// so o HTML dela.
//
// Para mudar uma headline: edite app/headlines.ts e rode este script de novo.
// Nunca edite o index.html das pastas na mao - o proximo build apaga.

import { execFileSync, spawn } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const site = dirname(fileURLToPath(import.meta.url));
const repo = join(site, "..");

const BASE_PATH = "/psicologia";
const SITE_URL = `https://tacio10.github.io${BASE_PATH}`;

// Lista lida do mesmo arquivo que a pagina usa, para as duas nunca separarem.
const fonte = readFileSync(join(site, "app/headlines.ts"), "utf8");
const variantes = [
  ...fonte.matchAll(
    /slug:\s*"([^"]*)",\s*\n\s*nome:\s*"([^"]*)",\s*\n\s*titulo:\s*([^\n]+),\s*\n/g,
  ),
].map(([, slug, nome, titulo]) => ({ slug, nome, titulo }));

if (variantes.length === 0) {
  throw new Error("nao achei nenhuma variacao em app/headlines.ts");
}

/** Texto que tem de aparecer no HTML: o maior trecho da headline sem asterisco. */
function trechoEsperado(titulo, fonteTs) {
  // `titulo: tituloPadrao` -> pega o valor da constante
  let texto = titulo.trim();
  if (!texto.startsWith('"')) {
    const m = fonteTs.match(
      new RegExp(`const\\s+${texto}\\s*=\\s*\\n?\\s*"([^"]*)"`),
    );
    texto = m ? m[1] : "";
  } else {
    texto = texto.slice(1, -1);
  }
  const maior = texto
    .split("*")
    .map((p) => p.trim())
    .sort((a, b) => b.length - a.length)[0];
  return (maior ?? "")
    .slice(0, 40)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function esperarServidor(url, tentativas = 60) {
  return new Promise((ok, falhou) => {
    const tentar = (n) => {
      if (n <= 0) return falhou(new Error(`servidor nao subiu: ${url}`));
      fetch(url)
        .then((r) => (r.ok ? ok() : setTimeout(() => tentar(n - 1), 500)))
        .catch(() => setTimeout(() => tentar(n - 1), 500));
    };
    tentar(tentativas);
  });
}

let porta = 4390;

for (const v of variantes) {
  const env = {
    ...process.env,
    PAGES_BASE_PATH: BASE_PATH,
    PAGES_SITE_URL: SITE_URL,
    PAGES_VARIANTE: v.slug,
  };
  const destino = v.slug ? join(repo, v.slug) : repo;
  const rotulo = v.slug ? `/${v.slug}/` : "/ (principal)";
  porta += 1;

  console.log(`\n=== ${rotulo} - ${v.nome} ===`);

  execFileSync("npm", ["run", "build"], { cwd: site, env, stdio: "inherit" });

  // `detached` cria um grupo de processos proprio: `npm exec` abre um neto que
  // continua segurando a porta se a gente matar so o filho. Com o grupo, o
  // kill leva todos. Sem isso, o servidor da variacao anterior sobrevivia e as
  // seguintes eram geradas a partir dele - todas iguais, sem erro nenhum.
  const servidor = spawn("npx", ["vinext", "start", "--port", String(porta)], {
    cwd: site,
    env,
    stdio: "ignore",
    detached: true,
  });

  try {
    const url = `http://127.0.0.1:${porta}${BASE_PATH}/`;
    await esperarServidor(url);
    const html = await fetch(url).then((r) => r.text());

    // Conferencias que impedem gravar a pagina errada na pasta errada.
    const esperado = trechoEsperado(v.titulo, fonte);
    if (esperado && !html.includes(esperado)) {
      throw new Error(`o HTML de ${rotulo} nao traz a headline desta variacao`);
    }
    const temNoindex = html.includes('name="robots"');
    if (v.slug && !temNoindex) throw new Error(`${rotulo} saiu sem noindex`);
    if (!v.slug && temNoindex) throw new Error("a principal saiu com noindex");

    mkdirSync(destino, { recursive: true });
    writeFileSync(join(destino, "index.html"), html);
    console.log(`gravado: ${join(destino, "index.html")} (${html.length} bytes)`);
  } finally {
    try {
      process.kill(-servidor.pid, "SIGKILL");
    } catch {
      servidor.kill("SIGKILL");
    }
  }

  // Os arquivos estaticos (JS, imagens) sao os mesmos para todas; so a
  // principal os copia, na raiz, de onde as outras tambem leem.
  if (!v.slug) {
    cpSync(join(site, "dist/client"), repo, { recursive: true });
    console.log("arquivos estaticos copiados para a raiz");
  }
}

console.log("\nPronto. Confira as paginas antes de publicar.");
