// Variacoes de headline para teste.
//
// Cada variacao vira uma pasta propria no site publicado, gerada pelo mesmo
// codigo. Nao edite o HTML das pastas na mao: mude aqui e rode
// `node build-variantes.mjs`, que regenera as quatro.
//
//   ""  -> tacio10.github.io/psicologia/
//   "b" -> tacio10.github.io/psicologia/b/
//   "c" -> tacio10.github.io/psicologia/c/
//   "d" -> tacio10.github.io/psicologia/d/
//
// Dentro do texto, o que estiver entre asteriscos sai com a cor de destaque:
//   "Quer passar na *EBSERH*?"  ->  Quer passar na <strong>EBSERH</strong>?
//
// Escreva cada headline numa linha so. Quebra de linha no meio do texto nao
// aparece na pagina, mas tambem nao estraga nada.

export type Variante = {
  /** Pasta da variacao. Vazio = pagina principal, na raiz. */
  slug: string;
  /** Rotulo so para o log do build e para voce se achar. */
  nome: string;
  titulo: string;
  subtitulo: string;
};

const subtituloPadrao =
  "Comece a usar nosso app de música e pare de esquecer ou confundir leis, resoluções, autores e conceitos da sua prova de Psicologia.";

const tituloPadrao =
  "Quer passar na *EBSERH, Tribunais, Prefeituras ou Secretarias de Saúde?* Descubra como memorizar os assuntos de Psicologia que realmente são *cobrados nas Bancas!*";

export const variantes: Variante[] = [
  {
    slug: "",
    nome: "A (principal)",
    titulo: tituloPadrao,
    subtitulo: subtituloPadrao,
  },
  {
    slug: "b",
    nome: "B",
    titulo: tituloPadrao,
    subtitulo: subtituloPadrao,
  },
  {
    slug: "c",
    nome: "C",
    titulo: tituloPadrao,
    subtitulo: subtituloPadrao,
  },
  {
    slug: "d",
    nome: "D",
    titulo: tituloPadrao,
    subtitulo: subtituloPadrao,
  },
];

/** Variacao que este build esta gerando. Vazio = pagina principal. */
export const varianteAtual: Variante =
  variantes.find((v) => v.slug === (process.env.PAGES_VARIANTE ?? "")) ??
  variantes[0];

/**
 * Quebra o texto nos asteriscos. Os pedacos de indice impar sao os destacados.
 * Montar a headline a partir de uma string evita o problema do JSX comer o
 * espaco antes de uma tag quando o texto quebra de linha no codigo.
 */
export function partesDoTitulo(
  texto: string,
): { texto: string; destaque: boolean }[] {
  return texto
    .split("*")
    .map((pedaco, i) => ({ texto: pedaco, destaque: i % 2 === 1 }))
    .filter((p) => p.texto !== "");
}
