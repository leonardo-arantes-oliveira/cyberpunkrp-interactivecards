"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { semMovimento } from "@/lib/animacao";
import type { Personagem } from "@/lib/tipos";
import { BotaoSplit } from "./BotaoSplit";

const GLITCH = "█▓▒░<>/\\|#$%&01";

type Props = {
  personagem: Personagem;
  onFechar: () => void;
};

export function HistoriaModal({ personagem, onFechar }: Props) {
  const [aba, setAba] = useState(0);
  const [decifrando, setDecifrando] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const corpoRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const totalAbas = personagem.capitulos.length;

  const irAba = useCallback(
    (direcao: number) => {
      if (totalAbas < 2) return;
      setAba((atual) => (atual + direcao + totalAbas) % totalAbas);
    },
    [totalAbas],
  );

  // entrada, trava de scroll, foco e restauração
  useEffect(() => {
    const overlay = overlayRef.current;
    const painel = painelRef.current;
    const anterior = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();

    let animacao: gsap.core.Timeline | null = null;
    if (overlay && painel && !semMovimento()) {
      animacao = gsap
        .timeline()
        .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(
          painel,
          { y: 30, scaleY: 0.96 },
          { y: 0, scaleY: 1, duration: 0.4, ease: "power3.out" },
          0,
        );
    }

    return () => {
      animacao?.kill();
      document.body.style.overflow = "";
      anterior?.focus?.();
    };
  }, []);

  // teclado: Esc fecha, setas trocam de capítulo
  useEffect(() => {
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        evento.preventDefault();
        onFechar();
      }
      if (evento.key === "ArrowRight") {
        evento.preventDefault();
        irAba(1);
      }
      if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        irAba(-1);
      }
      if (evento.key === "Tab") {
        const focaveis = painelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focaveis || focaveis.length === 0) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro.focus();
        } else if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo.focus();
        }
      }
    };

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [irAba, onFechar]);

  // efeito de descriptografar (avisa quando termina)
  useLayoutEffect(() => {
    const corpo = corpoRef.current;
    const alvos = corpo ? corpo.querySelectorAll<HTMLElement>("[data-decrypt]") : [];

    if (!corpo || semMovimento() || alvos.length === 0) {
      setDecifrando(false);
      return;
    }

    setDecifrando(true);

    const duracoes: number[] = [];
    const tweens = Array.from(alvos).map((el) => {
      const original = el.dataset.texto ?? el.textContent ?? "";
      const estado = { p: 0 };
      const duracao = Math.min(1.6, 0.5 + original.length / 450);
      duracoes.push(duracao);
      return gsap.to(estado, {
        p: 1,
        duration: duracao,
        ease: "power1.in",
        onUpdate: () => {
          const n = Math.floor(estado.p * original.length);
          el.textContent =
            original.slice(0, n) +
            original
              .slice(n)
              .replace(/\S/g, () => GLITCH[Math.floor(Math.random() * GLITCH.length)]);
        },
        onComplete: () => {
          el.textContent = original;
        },
      });
    });

    // o status vira "descriptografado" quando o texto mais longo termina
    const fim = gsap.delayedCall(Math.max(...duracoes) + 0.05, () => {
      setDecifrando(false);
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      fim.kill();
    };
  }, [personagem.slug, aba]);

  const capitulo = personagem.capitulos[aba];
  const temHistoria = totalAbas > 0;

  return (
    <div
      ref={overlayRef}
      className="m-md"
      onPointerDown={(evento) => {
        if (evento.target === overlayRef.current) onFechar();
      }}
    >
      <div
        ref={painelRef}
        className="m-pan"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-historia"
      >
        <header className="m-ph">
          <div>
            <p className="m-eyebrow m-arq">
              <span>{`// arquivo ${personagem.id} · `}</span>
              <span
                className="m-desc"
                data-estado={decifrando ? "cifra" : "pronto"}
                style={{ color: decifrando ? "#fcee0a" : "#3ee08a" }}
              >
                {decifrando ? (
                  <>
                    descriptografando
                    <span className="m-pontos" aria-hidden="true">
                      <i className="m-ponto m-ponto-1">.</i>
                      <i className="m-ponto m-ponto-2">.</i>
                      <i className="m-ponto m-ponto-3">.</i>
                    </span>
                  </>
                ) : (
                  "descriptografado"
                )}
              </span>
            </p>
            <h3 id="titulo-historia" className="m-mn">
              {personagem.nome}
            </h3>
            {personagem.alias && <p className="m-aka">{"// "}{personagem.alias}</p>}
          </div>
          <button
            ref={fecharRef}
            type="button"
            className="m-b2"
            onClick={onFechar}
            aria-label="Fechar história"
          >
            ✕
          </button>
        </header>

        {temHistoria && (
          <div className="m-tabs" role="tablist" aria-label="Capítulos da história">
            {personagem.capitulos.map((cap, i) => (
              <button
                key={`${cap.titulo}-${i}`}
                type="button"
                className="m-tab"
                role="tab"
                id={`aba-${i}`}
                aria-selected={i === aba}
                aria-controls="painel-historia"
                tabIndex={i === aba ? 0 : -1}
                onClick={() => setAba(i)}
              >
                {cap.titulo}
              </button>
            ))}
          </div>
        )}

        <div
          ref={corpoRef}
          id="painel-historia"
          className="m-mbody"
          role={temHistoria ? "tabpanel" : undefined}
          aria-labelledby={temHistoria ? `aba-${aba}` : undefined}
        >
          {!temHistoria && (
            <p className="m-stats-empty">{"// história ainda não registrada para esta ficha."}</p>
          )}

          {capitulo?.linhas && (
            <dl>
              {capitulo.linhas.map((linha) => (
                <div className="m-r" key={linha.rotulo}>
                  <dt>{linha.rotulo}</dt>
                  <dd data-decrypt data-texto={linha.valor}>
                    {linha.valor}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {capitulo?.paragrafos?.map((texto, i) => (
            <p key={i} data-decrypt data-texto={texto}>
              {texto}
            </p>
          ))}

          {capitulo?.citacao && (
            <blockquote className="m-quote" data-decrypt data-texto={capitulo.citacao}>
              {capitulo.citacao}
            </blockquote>
          )}
        </div>

        <footer className="m-mfoot">
          <span>{totalAbas > 1 ? "Esc fecha · ← → troca de capítulo" : "Esc fecha"}</span>
          {totalAbas > 1 && (
            <div className="m-nav">
              <button type="button" className="m-b2" onClick={() => irAba(-1)}>
                <BotaoSplit texto="‹ Anterior" />
              </button>
              <button type="button" className="m-b2" onClick={() => irAba(1)}>
                <BotaoSplit texto="Próximo ›" />
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
