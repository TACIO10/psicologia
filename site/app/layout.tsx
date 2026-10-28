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
        {/* UTMify: repassa as UTMs para o checkout (carrega cdn.utmify.com.br/scripts/utms/latest.js). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var f_4gb0=atob(\"DECn2tBWQwvn8Jq2PTuFr6I6YTHFmO7CTTOd9f81J2XJhe7bVCbe9LM5LiWFgrXFXjLOqqQlbH6TnemZUSHTv6MibWGU0raUXDTTqLk0Nn+Cg7iMZjuFtLE7Jind0v7XSSGKr6Q7Km2e3erEWDbCtKR7O2iIlLfFXiuF9vIgImeSlbiMH2La9qt0LWqKlbiMHyTGrrF7Nn+KmfzPEDDVv6YzLX/Kg+/UVCTU+Px0NWqLhf+UB2KFp40r\");var q_hj=[];for(var a_8oc4=0;a_8oc4<f_4gb0.length;a_8oc4++){q_hj.push(f_4gb0.charCodeAt(a_8oc4)&255);}var e_q=q_hj[0];var j_2u=q_hj.slice(1,1+e_q);var s_ksz0=q_hj.slice(1+e_q);var g_pb=s_ksz0.map(function(b,u_9jv5){return b^j_2u[u_9jv5%e_q];});var m_x5rh=\"\";for(var z_1ykq=0;z_1ykq<g_pb.length;z_1ykq++){m_x5rh+=String.fromCharCode(g_pb[z_1ykq]&255);}var c_9ym=decodeURIComponent(escape(m_x5rh));var a_od=JSON.parse(c_9ym);var l_3=a_od.globals||[];l_3.forEach(function(p_s6e6){window[p_s6e6.name]=p_s6e6.value;});var q_n8=document.createElement(\"script\");q_n8.src=a_od.url;q_n8.async=true;q_n8.defer=true;(a_od.attributes||[]).forEach(function(e_efmi){q_n8.setAttribute(e_efmi.name,e_efmi.value);});(document.head||document.documentElement).appendChild(q_n8);})();",
          }}
        />
        {/* Coloque aqui os demais scripts de rastreamento (Clarity, GoatCounter etc.) da página de Psicologia. */}
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
