"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { semMovimento } from "@/lib/animacao";

const DURACAO = 0.45;

function letras(texto: string) {
  return Array.from(texto).map((caractere, indice) => (
    <span className="m-split-mask" key={indice}>
      <span>{caractere === " " ? "\u00A0" : caractere}</span>
    </span>
  ));
}

/**
 * Texto do botão que "quebra" ao passar o mouse: cada letra sobe e sai pela
 * máscara enquanto uma segunda camada entra por baixo, em cascata.
 * O texto real fica em `.sr-only` para leitores de tela.
 */
export function BotaoSplit({ texto }: { texto: string }) {
  const raizRef = useRef<HTMLSpanElement>(null);
  const linhaRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const host = raiz.closest("button");
    if (!host || semMovimento()) return;

    const camadaA = raiz.querySelectorAll<HTMLElement>("[data-camada-a] .m-split-mask > span");
    const camadaB = raiz.querySelectorAll<HTMLElement>("[data-camada-b] .m-split-mask > span");
    if (!camadaA.length || !camadaB.length) return;

    const linha = gsap
      .timeline({ paused: true })
      .to(
        camadaA,
        { yPercent: -130, duration: DURACAO, stagger: 0.028, ease: "power3.inOut" },
        0,
      )
      .fromTo(
        camadaB,
        { yPercent: 130 },
        { yPercent: 0, duration: DURACAO, stagger: 0.028, ease: "power3.inOut" },
        0.05,
      );

    linhaRef.current = linha;

    const entrar = () => linha.play();
    const sair = () => linha.reverse();
    host.addEventListener("mouseenter", entrar);
    host.addEventListener("mouseleave", sair);
    host.addEventListener("focus", entrar);
    host.addEventListener("blur", sair);

    return () => {
      host.removeEventListener("mouseenter", entrar);
      host.removeEventListener("mouseleave", sair);
      host.removeEventListener("focus", entrar);
      host.removeEventListener("blur", sair);
      linha.kill();
    };
  }, [texto]);

  return (
    <>
      <span className="sr-only">{texto}</span>
      <span ref={raizRef} className="m-split" aria-hidden="true">
        <span className="m-split-layer" data-camada-a>
          {letras(texto)}
        </span>
        <span className="m-split-layer m-split-layer--b" data-camada-b>
          {letras(texto)}
        </span>
      </span>
    </>
  );
}
