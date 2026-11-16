"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { semMovimento } from "@/lib/animacao";
import { atributosDoPersonagem } from "@/lib/atributos";
import type { Personagem } from "@/lib/tipos";
import { Radar } from "./Radar";

export function Stats({ aberto, personagem }: { personagem: Personagem; aberto: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const montado = useRef(false);

  const atributos = atributosDoPersonagem(personagem.stats);
  const temRadar = atributos.some((atributo) => atributo.valor > 0);
  const vazio = personagem.stats.length === 0 && personagem.meta.length === 0;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (!montado.current) {
      montado.current = true;
      return;
    }

    if (semMovimento()) {
      el.style.height = aberto ? "auto" : "0px";
      return;
    }

    if (aberto) {
      gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.55, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [aberto]);

  return (
    <div ref={wrapRef} id={`stats-${personagem.slug}`} className="m-stats" data-aberto={aberto}>
      <div className="m-si">
        {temRadar && <Radar atributos={atributos} />}

        {!temRadar &&
          personagem.stats.map((stat) => (
            <div className="m-st m-st--simples" key={stat.rotulo}>
              <span>{stat.rotulo}</span>
              <span className="m-val">{Math.round(stat.valor)}</span>
            </div>
          ))}

        {personagem.meta.length > 0 && (
          <dl className="m-meta">
            {personagem.meta.map((linha) => (
              <div key={linha.rotulo}>
                <dt>{linha.rotulo}</dt>
                <dd>{linha.valor}</dd>
              </div>
            ))}
          </dl>
        )}

        {vazio && <p className="m-stats-empty">{"// sem atributos registrados"}</p>}
      </div>
    </div>
  );
}
