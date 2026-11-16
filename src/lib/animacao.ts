"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";

export const semMovimento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const podeHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/**
 * Inclinação 3D suave acompanhando o mouse (só em dispositivos com hover).
 * Ângulo e perspectiva moderados para o texto não ficar lavado pelo raster.
 */
export function useTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento() || !podeHover()) return;

    gsap.set(el, { transformPerspective: 1400, transformOrigin: "50% 50%" });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });

    const mover = (evento: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((evento.clientX - r.left) / r.width - 0.5) * 7);
      rx(-((evento.clientY - r.top) / r.height - 0.5) * 7);
    };
    const sair = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", sair);
    return () => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", sair);
      gsap.killTweensOf(el);
    };
  }, [ref]);
}

/**
 * Animação por caractere ao entrar no host (o card inteiro).
 * modo "glitch": dispersão com sombra cromática; modo "cor": salto com troca de cor.
 */
export function useCharsHover(
  hostRef: RefObject<HTMLElement | null>,
  textoRef: RefObject<HTMLElement | null>,
  modo: "glitch" | "cor" = "glitch",
  cor?: string,
) {
  useEffect(() => {
    const host = hostRef.current;
    const texto = textoRef.current;
    if (!host || !texto || semMovimento()) return;

    let tween: gsap.core.Tween | null = null;

    const entrar = () => {
      const chars = texto.querySelectorAll<HTMLElement>("[data-char]");
      if (!chars.length) return;
      tween?.kill();
      tween = gsap.from(
        chars,
        modo === "glitch"
          ? {
              x: () => gsap.utils.random(-9, 9),
              opacity: 0,
              textShadow: "3px 0 #08DAE9, -3px 0 #FF2F27",
              duration: 0.35,
              stagger: { each: 0.02, from: "random" },
              clearProps: "all",
            }
          : {
              yPercent: -80,
              opacity: 0,
              color: cor,
              duration: 0.4,
              stagger: { each: 0.025, from: "random" },
              ease: "back.out(2)",
              clearProps: "all",
            },
      );
    };

    host.addEventListener("mouseenter", entrar);
    return () => {
      host.removeEventListener("mouseenter", entrar);
      tween?.kill();
    };
  }, [hostRef, textoRef, modo, cor]);
}
