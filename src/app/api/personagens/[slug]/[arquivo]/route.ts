import { promises as fs } from "node:fs";
import path from "node:path";
import { PASTA_PERSONAGENS } from "@/lib/personagens";

const TIPOS: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
};

const SEGURO = /^[^\\/\u0000]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; arquivo: string }> },
) {
  const { slug, arquivo } = await params;

  if (
    !SEGURO.test(slug) ||
    !SEGURO.test(arquivo) ||
    slug.startsWith(".") ||
    arquivo.startsWith(".")
  ) {
    return new Response("Not found", { status: 404 });
  }

  const tipo = TIPOS[path.extname(arquivo).toLowerCase()];
  if (!tipo) return new Response("Not found", { status: 404 });

  const base = path.join(PASTA_PERSONAGENS, slug);
  const alvo = path.join(base, arquivo);

  if (!alvo.startsWith(base + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const dados = await fs.readFile(alvo);
    const cache =
      process.env.NODE_ENV === "production"
        ? "public, max-age=86400, stale-while-revalidate=604800"
        : "no-store";
    return new Response(new Uint8Array(dados), {
      headers: {
        "Content-Type": tipo,
        "Content-Length": String(dados.byteLength),
        "Cache-Control": cache,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
