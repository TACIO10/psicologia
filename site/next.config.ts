import type { NextConfig } from "next";

// O site é publicado no GitHub Pages em https://tacio10.github.io/enfermeira.v3,
// que serve a pasta docs/ a partir de um subcaminho. Para gerar esse build:
//
//   PAGES_BASE_PATH=/enfermeira.v3 \
//   PAGES_SITE_URL=https://tacio10.github.io/enfermeira.v3 \
//   npm run build
//
// Sem essas variáveis o build sai na raiz, como o ChatGPT Sites espera.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
