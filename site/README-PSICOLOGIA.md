# Página de vendas · Memória Musical Psicologia

O código-fonte (Next.js / vinext) fica nesta pasta `site/`. O site publicado é a
versão gerada que fica na raiz do repositório, servida pelo GitHub Pages.

## Quatro páginas, um código só

A página existe em quatro endereços, para testar headline:

| endereço | pasta no repositório | variação |
| --- | --- | --- |
| `tacio10.github.io/psicologia/` | raiz | A (principal) |
| `tacio10.github.io/psicologia/b/` | `b/` | B |
| `tacio10.github.io/psicologia/c/` | `c/` | C |
| `tacio10.github.io/psicologia/d/` | `d/` | D |

As quatro saem do mesmo código. A única diferença é a headline (e o
`noindex` nas três variações, para o Google não indexar páginas quase iguais).
Imagens, músicas e JS ficam numa cópia só, na raiz, porque os caminhos são
absolutos — cada variação a mais custa só o HTML dela.

**Nunca edite o `index.html` das pastas na mão.** O próximo build apaga.

## Para editar e publicar de novo

```bash
cd site
npm ci
node build-variantes.mjs
```

Isso gera as quatro páginas de uma vez. O script confere, em cada uma, se o
HTML saiu com a headline daquela variação e com o `noindex` certo — se algo não
bater, ele para antes de gravar.

Para trocar uma headline, edite `app/headlines.ts` e rode o script de novo.
Dentro do texto, o que estiver entre asteriscos sai com a cor de destaque.

Prévias de áudio: coloque os MP3 de 25s em `public/media/previews/psicologia/`,
com os nomes listados em `app/app-demo.tsx`, e gere o site de novo.
