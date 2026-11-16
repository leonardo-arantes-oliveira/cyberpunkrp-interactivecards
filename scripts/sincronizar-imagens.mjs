/**
 * Copia as imagens de src/data/personagens/<slug>/ para public/fichas/<slug>/.
 *
 * No export estático não existe servidor para ler arquivos do disco, então as
 * imagens precisam estar em `public/`. A pasta `public/fichas` é gerada (está
 * no .gitignore): a fonte da verdade continua sendo a pasta de cada ficha.
 *
 * Roda automaticamente antes de `npm run dev` e `npm run build`.
 */
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const raiz = process.cwd();
const origem = path.join(raiz, "src", "data", "personagens");
const destino = path.join(raiz, "public", "fichas");

const EXTENSOES_IMAGEM = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const IGNORAR = /^[_.]/;

async function main() {
  await rm(destino, { recursive: true, force: true });
  await mkdir(destino, { recursive: true });

  let entradas;
  try {
    entradas = await readdir(origem, { withFileTypes: true });
  } catch {
    console.warn(`[fichas] pasta não encontrada: ${origem}`);
    return;
  }

  let copiadas = 0;
  let fichas = 0;

  for (const entrada of entradas) {
    if (!entrada.isDirectory() || IGNORAR.test(entrada.name)) continue;

    const pasta = path.join(origem, entrada.name);
    const arquivos = (await readdir(pasta)).filter((arquivo) =>
      EXTENSOES_IMAGEM.has(path.extname(arquivo).toLowerCase()),
    );
    if (!arquivos.length) continue;

    fichas += 1;
    await mkdir(path.join(destino, entrada.name), { recursive: true });

    for (const arquivo of arquivos) {
      await cp(path.join(pasta, arquivo), path.join(destino, entrada.name, arquivo));
      copiadas += 1;
    }
  }

  console.log(`[fichas] ${copiadas} imagem(ns) de ${fichas} ficha(s) copiada(s) para public/fichas`);
}

main().catch((erro) => {
  console.error("[fichas] falha ao sincronizar imagens:", erro);
  process.exit(1);
});
