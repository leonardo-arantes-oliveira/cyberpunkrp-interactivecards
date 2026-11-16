/**
 * `npm run dev` com sincronização automática das imagens.
 *
 * O site lê as fotos de public/fichas/<slug>/, que é uma cópia da pasta de cada
 * ficha. Sem isso, trocar uma foto em src/data/personagens enquanto o dev server
 * está rodando continuaria mostrando a imagem antiga até reiniciar.
 *
 * A observação roda em processo separado (scripts/vigiar-imagens.mjs) porque o
 * Next engole os eventos do fs.watch quando divide o processo com ele no Windows.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const scriptVigia = path.join(raiz, "scripts", "vigiar-imagens.mjs");
const binNext = path.join(raiz, "node_modules", "next", "dist", "bin", "next");

if (!existsSync(binNext)) {
  console.error("[dev] Next não encontrado em node_modules. Rode `npm install`.");
  process.exit(1);
}

const vigia = spawn(process.execPath, [scriptVigia], { stdio: "inherit" });
const next = spawn(process.execPath, [binNext, "dev"], { stdio: "inherit" });

let encerrando = false;
const encerrar = (codigo = 0) => {
  if (encerrando) return;
  encerrando = true;
  try {
    vigia.kill();
  } catch {
    /* já encerrado */
  }
  try {
    next.kill();
  } catch {
    /* já encerrado */
  }
  process.exit(codigo);
};

process.on("SIGINT", () => encerrar(0));
process.on("SIGTERM", () => encerrar(0));

vigia.on("exit", (codigo) => {
  if (!encerrando && codigo) console.warn("[fichas] observador encerrou; use npm run sincronizar.");
});
next.on("exit", (codigo) => encerrar(codigo ?? 0));
