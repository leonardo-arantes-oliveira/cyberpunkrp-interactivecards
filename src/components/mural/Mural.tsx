"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { semMovimento } from "@/lib/animacao";
import { BUILDS, HABILIDADES, ORIGENS, comDados } from "@/lib/categorias";
import { caminhoPublico } from "@/lib/caminhos";
import type { Personagem } from "@/lib/tipos";
import { Filtros, type Ordem } from "./Filtros";
import { HistoriaModal } from "./HistoriaModal";
import { PersonagemCard } from "./PersonagemCard";

export function Mural({ personagens }: { personagens: Personagem[] }) {
  const [busca, setBusca] = useState("");
  const [origem, setOrigem] = useState("");
  const [habilidade, setHabilidade] = useState("");
  const [build, setBuild] = useState("");
  const [ordem, setOrdem] = useState<Ordem>("az");
  const [aberto, setAberto] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const origens = useMemo(
    () => comDados(ORIGENS, personagens.map((p) => p.origem)),
    [personagens],
  );

  const habilidades = useMemo(
    () => comDados(HABILIDADES, personagens.flatMap((p) => p.habilidades)),
    [personagens],
  );

  const builds = useMemo(
    () => comDados(BUILDS, personagens.flatMap((p) => p.builds)),
    [personagens],
  );

  const ordenados = useMemo(() => {
    return [...personagens].sort((a, b) =>
      ordem === "az"
        ? a.nome.localeCompare(b.nome, "pt-BR")
        : a.id.localeCompare(b.id, "pt-BR", { numeric: true }),
    );
  }, [personagens, ordem]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return ordenados.filter((p) => {
      const combinaOrigem = !origem || p.origem === origem;
      const combinaHabilidade = !habilidade || p.habilidades.includes(habilidade);
      const combinaBuild = !build || p.builds.includes(build);
      const combinaBusca =
        !termo || `${p.nome} ${p.alias ?? ""}`.toLowerCase().includes(termo);
      return combinaOrigem && combinaHabilidade && combinaBuild && combinaBusca;
    });
  }, [ordenados, busca, origem, habilidade, build]);

  const posicoes = useMemo(
    () => new Map(filtrados.map((p, indice) => [p.slug, indice])),
    [filtrados],
  );

  const personagemAberto = aberto ? ordenados.find((p) => p.slug === aberto) : undefined;

  // entrada única da grade
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || semMovimento()) return;
    const cards = grid.querySelectorAll("[data-card]");
    if (!cards.length) return;
    gsap.from(cards, {
      opacity: 0,
      y: 36,
      skewX: -4,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "opacity,y,skewX,transform",
    });
  }, []);

  // filtrar: reordena via CSS order e entra/sai com glitch
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const visiveis = new Set(filtrados.map((p) => p.slug));
    const reduz = semMovimento();

    grid.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      const mostrar = visiveis.has(card.dataset.slug ?? "");
      const estava = card.dataset.visivel === "1";
      if (mostrar === estava) return;

      if (reduz) {
        card.style.display = mostrar ? "" : "none";
        card.dataset.visivel = mostrar ? "1" : "0";
        return;
      }

      if (mostrar) {
        card.style.display = "";
        card.dataset.visivel = "1";
        gsap.fromTo(
          card,
          { opacity: 0, x: 12, skewX: -6 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.35, clearProps: "opacity,x,skewX" },
        );
      } else {
        card.dataset.visivel = "0";
        gsap
          .timeline({
            onComplete: () => {
              card.style.display = "none";
            },
          })
          .to(card, {
            x: () => gsap.utils.random(-14, 14),
            skewX: () => gsap.utils.random(-10, 10),
            duration: 0.06,
            repeat: 3,
            yoyo: true,
            ease: "none",
          })
          .to(card, {
            opacity: 0,
            duration: 0.12,
            onComplete: () => gsap.set(card, { clearProps: "opacity,x,skewX" }),
          });
      }
    });
  }, [filtrados]);

  const limparFiltros = () => {
    setBusca("");
    setOrigem("");
    setHabilidade("");
    setBuild("");
  };

  return (
    <div className="mural">
      <header className="m-top">
        <Link href="/" className="m-logo" aria-label="Afterlife Roleplay — início">
          <Image
            src={caminhoPublico("/logo.png")}
            alt="Afterlife Roleplay"
            width={160}
            height={53}
            priority
          />
        </Link>

        <p className="m-eyebrow">{"/// afterlife//rp · banco de dados"}</p>
        <h1 className="m-title">
          Mural de <em>personagens</em>
        </h1>
        <p className="m-sub">
          Cada ficha é um dossiê fechado. A história completa só abre dentro do card.
        </p>

        <Filtros
          busca={busca}
          onBusca={setBusca}
          origens={origens}
          origem={origem}
          onOrigem={setOrigem}
          habilidades={habilidades}
          habilidade={habilidade}
          onHabilidade={setHabilidade}
          builds={builds}
          build={build}
          onBuild={setBuild}
          ordem={ordem}
          onOrdem={setOrdem}
        />
      </header>

      {filtrados.length === 0 ? (
        <div className="m-empty">
          <div className="m-empty-in">
            <p className="m-eyebrow">{"// sinal perdido"}</p>
            {personagens.length === 0 ? (
              <p>
                Nenhuma ficha no banco de dados. Crie uma pasta em{" "}
                <code>src/data/personagens</code> com um JSON e as imagens do personagem.
              </p>
            ) : (
              <p>Nenhuma ficha bate com esses filtros. Ajuste a busca ou volte para todos.</p>
            )}
            {personagens.length > 0 && (
              <button type="button" className="m-b2" onClick={limparFiltros}>
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      ) : null}

      <main ref={gridRef} className="m-grid">
        {ordenados.map((personagem) => (
          <PersonagemCard
            key={personagem.slug}
            personagem={personagem}
            ordem={posicoes.get(personagem.slug) ?? 9999}
            ativo={aberto === personagem.slug}
            onAbrir={setAberto}
          />
        ))}
      </main>

      <footer className="m-foot">
        <p>
          {"// "}
          {String(filtrados.length).padStart(2, "0")} / {String(personagens.length).padStart(2, "0")}{" "}
          fichas
        </p>
        <p>Fichas lidas de src/data/personagens · Afterlife Roleplay</p>
      </footer>

      {personagemAberto && (
        <HistoriaModal personagem={personagemAberto} onFechar={() => setAberto(null)} />
      )}
    </div>
  );
}
