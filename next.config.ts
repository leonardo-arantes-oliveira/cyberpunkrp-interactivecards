import type { NextConfig } from "next";

/**
 * GitHub Pages só serve arquivos estáticos, então o site é exportado com
 * `output: "export"` (gera a pasta `out/`).
 *
 * Num site de projeto (https://usuario.github.io/cyberpunkrp-interactivecards/)
 * tudo precisa viver sob um subdiretório. O workflow do Actions define
 * NEXT_PUBLIC_BASE_PATH com o valor de `actions/configure-pages`; sem essa
 * variável (dev local, `npm run build` na máquina) o site roda na raiz.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  // /mural -> /mural/index.html, o que o GitHub Pages entende de primeira.
  trailingSlash: true,
  basePath,
  // O otimizador de imagem do Next precisa de servidor; no export usamos os
  // arquivos como estão (já vêm em webp/jpg comprimidos).
  images: {
    unoptimized: true,
  },
  // `cacheComponents` (que liga o PPR) exige um servidor Node e quebra com
  // `output: "export"` ("Invariant: PPR cannot be enabled in export mode").
  // O mural é uma página só, totalmente prerenderizada no build, então nada se perde.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
