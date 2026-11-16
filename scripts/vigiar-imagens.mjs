/**
 * Observa src/data/personagens e recopia as imagens para public/fichas.
 *
 * Roda em processo separado (iniciado por scripts/dev.mjs) porque o Next em
 * modo dev, quando compartilha o mesmo processo, acaba engolindo os eventos do
 * fs.watch no Windows: assim a sincronização continua funcionando.
 */
import { spawn } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const origem = path.join(raiz, "src", "data", "personagens");
const scriptSync = path.join(raiz, "scripts", "sincronizar-imagens.mjs");

const ehImagem = (arquivo) => /\.(webp|jpe?g|png|avif)$/i.test(arquivo ?? "");

let rodando = false;
let pendente = false;
let timer = null;

function sincronizar() {
  if (rodando) {
    pendente = true;
    return;
  }
  rodando = true;
  const filho = spawn(process.execPath, [scriptSync], { stdio: "inherit" });
  filho.on("exit", () => {
    rodando = false;
    if (pendente) {
      pendente = false;
      sincronizar();
    }
  });
}

sincronizar();

const observador = watch(origem, { recursive: true }, (_evento, arquivo) => {
  if (!ehImagem(arquivo)) return;
  if (process.env.FICHAS_DEBUG) console.log(`[fichas] mudança detectada: ${arquivo}`);
  clearTimeout(timer);
  timer = setTimeout(sincronizar, 300);
});

observador.on("error", (erro) => {
  console.warn(`[fichas] observação interrompida (${erro.message}); use npm run sincronizar.`);
});

const encerrar = () => {
  clearTimeout(timer);
  observador.close();
  process.exit(0);
};

process.on("SIGINT", encerrar);
process.on("SIGTERM", encerrar);
process.on("exit", () => observador.close());
