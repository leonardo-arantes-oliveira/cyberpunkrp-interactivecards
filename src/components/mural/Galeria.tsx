"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { semMovimento } from "@/lib/animacao";
import type { Personagem } from "@/lib/tipos";

/**
 * Cada imagem da pasta é um slide de verdade. Passar o mouse só aproxima no
 * rosto; a troca acontece quando o usuário pede, pelas setas ou pelo arraste,
 * com um efeito de troca de canal de TV antiga (colapso vertical, giro curto
 * e faixa de varredura).
 */
export function Galeria({ personagem }: { personagem: Personagem }) {
  const imagens = personagem.imagens;
  const total = imagens.length;
  const [atual, setAtual] = useState(0);
  const [close, setClose] = useState(false);
  const inicioX = useRef<number | null>(null);
  const gal = useRef<HTMLDivElement>(null);
  const pilha = useRef<HTMLDivElement>(null);
  const faixa = useRef<HTMLSpanElement>(null);
  const linhas = useRef<HTMLSpanElement>(null);
  const trocando = useRef(false);

  useEffect(
    () => () => {
      if (pilha.current) gsap.killTweensOf([pilha.current, faixa.current, linhas.current]);
    },
    [],
  );

  const ir = (direcao: number) => {
    if (total < 2) return;
    const proximo = (atual + direcao + total) % total;
    const el = pilha.current;
    const casa = gal.current;

    if (semMovimento() || !el || !casa) {
      setAtual(proximo);
      return;
    }
    if (trocando.current) return;
    trocando.current = true;
    casa.classList.add("is-flip");

    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          trocando.current = false;
          casa.classList.remove("is-flip");
          gsap.set([el, linhas.current], { clearProps: "all" });
          gsap.set(faixa.current, { top: "-18%" });
        },
      })
      .set(el, { transformPerspective: 900, transformOrigin: "50% 50%" })
      .set(faixa.current, { top: "-18%" })
      .to(linhas.current, { opacity: 0.85, duration: 0.05 }, 0)
      .to(
        el,
        {
          scaleY: 0.05,
          rotationY: -20,
          skewX: -12,
          filter: "brightness(2.4) blur(2px)",
          duration: 0.16,
          ease: "power3.in",
        },
        0,
      )
      .to(faixa.current, { top: "100%", duration: 0.16, ease: "power2.in" }, 0)
      .call(() => setAtual(proximo))
      .set(faixa.current, { top: "-18%" })
      .to(el, {
        scaleY: 1,
        rotationY: 20,
        skewX: 12,
        filter: "brightness(1.8) blur(0.6px)",
        duration: 0.34,
        ease: "power4.out",
      })
      .to(faixa.current, { top: "100%", duration: 0.34, ease: "power2.out" }, "<")
      .to(
        el,
        {
          rotationY: 0,
          skewX: 0,
          filter: "brightness(1) blur(0px)",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.14",
      )
      .to(linhas.current, { opacity: 0, duration: 0.2 }, "-=0.25");
  };

  return (
    <div
      ref={gal}
      className="m-gal"
      data-close={close}
      role="group"
      aria-roledescription="galeria"
      aria-label={`Imagens de ${personagem.nome}`}
      onPointerEnter={(evento) => {
        if (evento.pointerType === "mouse") setClose(true);
      }}
      onPointerLeave={() => setClose(false)}
      onPointerDown={(evento) => (inicioX.current = evento.clientX)}
      onPointerUp={(evento) => {
        if (inicioX.current !== null && Math.abs(evento.clientX - inicioX.current) > 40) {
          ir(evento.clientX < inicioX.current ? 1 : -1);
        }
        inicioX.current = null;
      }}
      onPointerCancel={() => (inicioX.current = null)}
    >
      <div className="m-gal-stack" ref={pilha}>
        {total > 0 ? (
          imagens.map((fonte, indice) => (
            <Image
              key={fonte}
              src={fonte}
              alt={`Retrato de ${personagem.nome}${total > 1 ? ` (${indice + 1} de ${total})` : ""}`}
              fill
              sizes="(max-width: 640px) 100vw, 380px"
              unoptimized
              draggable={false}
              className="m-gal-img"
              data-on={indice === atual}
              loading={indice === 0 ? "eager" : "lazy"}
            />
          ))
        ) : (
          <span className="m-sem-img">{"// sem imagem"}</span>
        )}
      </div>

      <span className="m-gal-lines" ref={linhas} aria-hidden="true" />
      <span className="m-gal-band" ref={faixa} aria-hidden="true" />

      <span className="m-bd m-bd-id">ID {personagem.id}</span>
      {total > 1 && (
        <span className="m-bd m-bd-count">
          {String(atual + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      )}

      {total > 1 && (
        <>
          <button
            type="button"
            className="m-ar m-ar-l"
            onClick={() => ir(-1)}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="m-ar m-ar-r"
            onClick={() => ir(1)}
            aria-label="Próxima foto"
          >
            ›
          </button>
        </>
      )}

      <span className="m-wm" aria-hidden="true">
        AFTERLIFE//RP
      </span>
    </div>
  );
}
