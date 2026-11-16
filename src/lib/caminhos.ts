/**
 * Caminhos de arquivos estáticos (pasta `public/`).
 *
 * No GitHub Pages o site é servido em /cyberpunkrp-interactivecards, então
 * qualquer referência a `/logo.png` precisa desse prefixo. O `next/image` não
 * aplica o basePath sozinho, por isso montamos a URL aqui.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** `/logo.png` -> `/cyberpunkrp-interactivecards/logo.png` (ou igual em dev). */
export function caminhoPublico(caminho: string) {
  const limpo = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return `${BASE_PATH}${limpo}`;
}
