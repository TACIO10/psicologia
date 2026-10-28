# Página de vendas · Memória Musical Psicologia

O código-fonte (Next.js / vinext) fica nesta pasta `site/`. O site publicado é a
versão gerada que fica na raiz do repositório, servida pelo GitHub Pages.

Para editar e publicar de novo:

```bash
cd site
npm ci
PAGES_BASE_PATH=/psicologia PAGES_SITE_URL=https://tacio10.github.io/psicologia npm run build
# suba o servidor e salve o HTML renderizado:
PAGES_BASE_PATH=/psicologia PAGES_SITE_URL=https://tacio10.github.io/psicologia npx vinext start --port 4319 &
curl -s http://127.0.0.1:4319/psicologia/ -o ../index.html
cp -r dist/client/. ..
```

Prévias de áudio: coloque os MP3 de 25s em `public/media/previews/psicologia/`,
com os nomes listados em `app/app-demo.tsx`, e gere o site de novo.
