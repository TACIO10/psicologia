import type { Metadata } from "next";
import globalStyles from "./globals.css?inline";

// Vazio no build padrao; "/psicologia" no build do GitHub Pages. O og:image
// precisa do prefixo aqui: caminho iniciado por "/" e resolvido contra a raiz
// do dominio, entao sem ele a imagem sai fora do subcaminho do Pages.
const asset = process.env.PAGES_BASE_PATH ?? "";
const ogImage = `${asset}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PAGES_SITE_URL ??
      "https://tacio10.github.io/psicologia",
  ),
  title: "Memória Musical | Revisão para Concursos de Psicologia",
  description:
    "Reforce os assuntos mais cobrados nos concursos de Psicologia com músicas que acompanham sua rotina.",
  openGraph: {
    title: "Memória Musical | Concursos de Psicologia",
    description: "Faça a matéria voltar à memória.",
    images: [{ url: ogImage, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memória Musical | Concursos de Psicologia",
    description: "Faça a matéria voltar à memória.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap"
        />
        <meta name="theme-color" content="#04140d" />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        {/* Coloque aqui os scripts de rastreamento (Clarity, GoatCounter etc.) da página de Psicologia. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.addEventListener("click",function(event){var button=event.target.closest("[data-price-jump]");if(!button)return;var target=document.getElementById("oferta");if(!target)return;target.scrollIntoView({behavior:"auto",block:"start"});});',
          }}
        />

      </head>
      <body>{children}</body>
    </html>
  );
}
