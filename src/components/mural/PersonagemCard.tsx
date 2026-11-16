"use client";

import { useRef, useState } from "react";
import { useCharsHover, useTilt } from "@/lib/animacao";
import type { Personagem } from "@/lib/tipos";
import { BotaoSplit } from "./BotaoSplit";
import { Chars } from "./Chars";
import { Galeria } from "./Galeria";
import { Icone, iconeDe } from "./icones";
import { Stats } from "./Stats";

type Props = {
  personagem: Personagem;
  ordem: number;
  ativo: boolean;
  onAbrir: (slug: string) => void;
};

export function PersonagemCard({ personagem, ordem, ativo, onAbrir }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const nomeRef = useRef<HTMLHeadingElement>(null);
  const [statsAberto, setStatsAberto] = useState(false);

  useTilt(cardRef);
  useCharsHover(cardRef, nomeRef, "glitch");

  return (
    <article
      ref={cardRef}
      className="m-card"
      style={{ order: ordem }}
      data-card
      data-slug={personagem.slug}
      data-visivel="1"
      data-ativo={ativo}
    >
      <div className="m-fr">
        <div className="m-in">
          <Galeria personagem={personagem} />

          <div className="m-body">
            <div className="m-pills">
              <span className="m-pill m-pill-origem">
                <Icone nome={iconeDe(personagem.origem, "origem")} />
                {personagem.origem}
              </span>
              {personagem.builds.map((build) => (
                <span className="m-pill m-pill-build" key={build}>
                  <Icone nome={iconeDe(build, "build")} />
                  {build}
                </span>
              ))}
            </div>

            {personagem.habilidades.length > 0 && (
              <ul className="m-habs" aria-label="Habilidades">
                {personagem.habilidades.map((habilidade) => (
                  <li className="m-hab" key={habilidade}>
                    <Icone nome={iconeDe(habilidade, "habilidade")} />
                    {habilidade}
                  </li>
                ))}
              </ul>
            )}

            {personagem.alias && <p className="m-aka">{"// "}{personagem.alias}</p>}

            <h2 ref={nomeRef} className="m-nm" aria-label={personagem.nome}>
              <Chars texto={personagem.nome} />
            </h2>

            {personagem.resumo && <p className="m-ln">{personagem.resumo}</p>}

            <Stats personagem={personagem} aberto={statsAberto} />

            <div className="m-acts">
              <button
                type="button"
                className="m-b2"
                aria-expanded={statsAberto}
                aria-controls={`stats-${personagem.slug}`}
                onClick={() => setStatsAberto((valor) => !valor)}
              >
                <BotaoSplit
                  key={statsAberto ? "aberto" : "fechado"}
                  texto={statsAberto ? "Status −" : "Status +"}
                />
              </button>

              <button
                type="button"
                className="m-b1"
                onClick={() => onAbrir(personagem.slug)}
                aria-label={`Ver história completa de ${personagem.nome}`}
              >
                <BotaoSplit texto="Ver história completa" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
