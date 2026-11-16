/**
 * Categorias do sistema de Cyberpunk 2077 (update 2.0).
 * Um personagem tem sempre UMA origem, mas pode ter VÁRIAS habilidades
 * e VÁRIAS builds. A ordem aqui é a ordem dos chips na tela.
 */

/** Corp = corporativo. */
export const ORIGENS = ["Nômade", "Marginal", "Corp"] as const;

/** Os 5 atributos principais. */
export const HABILIDADES = [
  "Corpo",
  "Reflexos",
  "Habilidade Técnica",
  "Inteligência",
  "Moral / Sangue Frio",
] as const;

/** Arquétipos de build definidos pelo sistema operacional e pelas armas. */
export const BUILDS = [
  "Netrunner",
  "Ninja / Samurai",
  "Tank / Solo Brutal",
  "Velocista com Sandevistan",
  "Pistoleiro / Atirador Furtivo",
] as const;

/** Junta a lista oficial com valores que apareçam nas fichas e não estejam nela. */
export function comDados(base: readonly string[], presentes: Iterable<string>) {
  const unicos = [...new Set([...presentes].filter(Boolean))];
  const extras = unicos
    .filter((valor) => !base.includes(valor))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  return [...base, ...extras];
}
