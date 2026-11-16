import { promises as fs } from "node:fs";
import path from "node:path";
import { caminhoPublico } from "./caminhos";
import type { Capitulo, LinhaMeta, Personagem, Stat } from "./tipos";

/**
 * Carrega todos os personagens de src/data/personagens/<pasta>/.
 * Basta criar a pasta com um .json e as imagens: nada de import manual.
 * A ordem das imagens vem do campo "imagens" do JSON; sem ele, ordem alfabética.
 */

export const PASTA_PERSONAGENS = path.join(process.cwd(), "src", "data", "personagens");

const EXTENSOES_IMAGEM = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const IGNORAR = /^[_.]/;

const texto = (valor: unknown, padrao = "") =>
  typeof valor === "string" && valor.trim() ? valor.trim() : padrao;

const numero = (valor: unknown, padrao = 0) => {
  const n = Number(valor);
  return Number.isFinite(n) ? n : padrao;
};

const lista = (valor: unknown) => {
  if (Array.isArray(valor)) return valor.map((item) => texto(item)).filter(Boolean);
  const unico = texto(valor);
  return unico ? [unico] : [];
};

const compararNatural = (a: string, b: string) =>
  a.localeCompare(b, "pt-BR", { numeric: true, sensitivity: "base" });

/**
 * As imagens são copiadas para public/fichas/<slug>/ antes do build
 * (scripts/sincronizar-imagens.mjs), porque o export estático não tem servidor.
 */
export function urlImagem(slug: string, arquivo: string) {
  return caminhoPublico(`/fichas/${encodeURIComponent(slug)}/${encodeURIComponent(arquivo)}`);
}

function normalizarStats(bruto: unknown): Stat[] {
  if (!Array.isArray(bruto)) return [];
  return bruto
    .map((item) => {
      if (Array.isArray(item)) {
        return { rotulo: texto(item[0]), valor: numero(item[1]) };
      }
      const obj = item as Record<string, unknown>;
      return { rotulo: texto(obj?.rotulo ?? obj?.label), valor: numero(obj?.valor ?? obj?.value) };
    })
    .filter((s) => s.rotulo.length > 0);
}

function normalizarLinhas(bruto: unknown): LinhaMeta[] {
  if (!Array.isArray(bruto)) return [];
  return bruto
    .map((item) => {
      if (Array.isArray(item)) {
        return { rotulo: texto(item[0]), valor: texto(item[1]) };
      }
      const obj = item as Record<string, unknown>;
      return {
        rotulo: texto(obj?.rotulo ?? obj?.label),
        valor: texto(obj?.valor ?? obj?.value),
      };
    })
    .filter((l) => l.rotulo.length > 0 && l.valor.length > 0);
}

function normalizarCapitulos(bruto: unknown): Capitulo[] {
  if (!Array.isArray(bruto)) return [];
  return bruto
    .map((item) => {
      const obj = (item ?? {}) as Record<string, unknown>;
      const paragrafos = Array.isArray(obj.paragrafos ?? obj.p ?? obj.texto)
        ? ((obj.paragrafos ?? obj.p ?? obj.texto) as unknown[]).map((p) => texto(p)).filter(Boolean)
        : [];
      const linhas = normalizarLinhas(obj.linhas ?? obj.rows);
      const citacao = texto(obj.citacao ?? obj.q);
      return {
        titulo: texto(obj.titulo ?? obj.t, "Arquivo"),
        ...(paragrafos.length ? { paragrafos } : {}),
        ...(linhas.length ? { linhas } : {}),
        ...(citacao ? { citacao } : {}),
      };
    })
    .filter((c) => c.paragrafos?.length || c.linhas?.length || c.citacao);
}

async function carregarPasta(slug: string): Promise<Personagem | null> {
  const pasta = path.join(PASTA_PERSONAGENS, slug);
  const arquivos = await fs.readdir(pasta);

  const jsonNome =
    arquivos.find((f) => f.toLowerCase() === `${slug.toLowerCase()}.json`) ??
    arquivos.find((f) => f.toLowerCase() === "personagem.json") ??
    arquivos.filter((f) => f.toLowerCase().endsWith(".json")).sort(compararNatural)[0];

  if (!jsonNome) {
    console.warn(`[mural] ${slug}: pasta sem JSON, ficha ignorada.`);
    return null;
  }

  let bruto: Record<string, unknown>;
  try {
    bruto = JSON.parse(await fs.readFile(path.join(pasta, jsonNome), "utf8"));
  } catch (erro) {
    console.error(`[mural] ${slug}: JSON inválido em ${jsonNome}.`, erro);
    return null;
  }

  const disponiveis = arquivos
    .filter((f) => EXTENSOES_IMAGEM.has(path.extname(f).toLowerCase()))
    .sort(compararNatural);

  const pedidas = Array.isArray(bruto.imagens)
    ? (bruto.imagens as unknown[]).map((i) => texto(i)).filter((i) => disponiveis.includes(i))
    : [];

  const imagens = (pedidas.length ? pedidas : disponiveis).map((arquivo) => urlImagem(slug, arquivo));

  if (!imagens.length) {
    console.warn(`[mural] ${slug}: nenhuma imagem encontrada na pasta.`);
  }

  return {
    slug,
    id: texto(bruto.id, "—"),
    nome: texto(bruto.nome ?? bruto.name, slug),
    alias: texto(bruto.alias ?? bruto.aka) || undefined,
    origem: texto(bruto.origem, "Sem origem"),
    habilidades: lista(bruto.habilidades ?? bruto.atributos),
    builds: lista(bruto.builds ?? bruto.classe ?? bruto.build),
    resumo: texto(bruto.resumo ?? bruto.descricao),
    matiz: numero(bruto.matiz ?? bruto.hue),
    stats: normalizarStats(bruto.stats),
    meta: normalizarLinhas(bruto.meta),
    capitulos: normalizarCapitulos(bruto.capitulos ?? bruto.ch ?? bruto.historia),
    imagens,
  };
}

export async function carregarPersonagens(): Promise<Personagem[]> {
  let entradas;
  try {
    entradas = await fs.readdir(PASTA_PERSONAGENS, { withFileTypes: true });
  } catch {
    console.warn("[mural] pasta src/data/personagens não encontrada.");
    return [];
  }

  const pastas = entradas
    .filter((e) => e.isDirectory() && !IGNORAR.test(e.name))
    .map((e) => e.name);

  const personagens = (await Promise.all(pastas.map(carregarPasta))).filter(
    (p): p is Personagem => p !== null,
  );

  return personagens.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}
