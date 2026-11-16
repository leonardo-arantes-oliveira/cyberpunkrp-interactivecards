import { HABILIDADES } from "./categorias";
import type { Stat } from "./tipos";

export type Atributo = { rotulo: string; valor: number };

/** Palavras que identificam cada atributo dentro do rótulo usado na ficha. */
const CHAVES: Record<string, string[]> = {
  Corpo: ["corpo", "body"],
  Reflexos: ["reflex"],
  "Habilidade Técnica": ["tecnic", "technical"],
  Inteligência: ["intelig"],
  "Moral / Sangue Frio": ["moral", "sangue", "cool", "frieza"],
};

const semAcento = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/**
 * Transforma a lista de stats da ficha nos cinco eixos do radar, na mesma
 * ordem dos filtros de Habilidades. Atributo sem valor na ficha entra com 0.
 */
export function atributosDoPersonagem(stats: Stat[]): Atributo[] {
  return HABILIDADES.map((rotulo) => {
    const chaves = CHAVES[rotulo] ?? [];
    const achado = stats.find((stat) => {
      const rotuloFicha = semAcento(stat.rotulo);
      return chaves.some((chave) => rotuloFicha.includes(chave));
    });
    const valor = achado ? Math.min(100, Math.max(0, achado.valor)) : 0;
    return { rotulo, valor };
  });
}
