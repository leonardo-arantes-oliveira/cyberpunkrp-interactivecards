"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { semMovimento } from "@/lib/animacao";
import type { Personagem } from "@/lib/tipos";

/** Intervalo entre as fotos enquanto o mouse está sobre a galeria. */
const INTERVALO = 1700;

/**
 * Cada imagem da pasta é um slide de verdade — nada de recortar a mesma foto
 * em zooms diferentes. No desktop, passar o mouse aproxima no rosto e alterna
 * entre as fotos; no toque, as setas e o arraste fazem o mesmo.
 */
export function Galeria({ personagem }: { personagem: Personagem }) {
  const imagens = personagem.imagens;
  const total = imagens.length;
  const [atual, setAtual] = useState(0);
  const [close, setClose] = useState(false);
  const timer = useRef<number | null>(null);
  const inicioX = useRef<number | null>(null);

  const pararTimer = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => pararTimer, []);

  const ir = (direcao: number) => {
    if (total < 2) return;
    setAtual((indice) => (indice + direcao + total) % total);
  };

  const entrar = (tipo: string) => {
    if (tipo !== "mouse") return;
    setClose(true);
    if (total < 2 || semMovimento()) return;
    pararTimer();
    timer.current = window.setInterval(() => {
      setAtual((indice) => (indice + 1) % total);
    }, INTERVALO);
  };

  const sair = () => {
    pararTimer();
    setClose(false);
  };

  return (
    <div
      className="m-gal"
      data-close={close}
      role="group"
      aria-roledescription="galeria"
      aria-label={`Imagens de ${personagem.nome}`}
      onPointerEnter={(evento) => entrar(evento.pointerType)}
      onPointerLeave={sair}
      onPointerDown={(evento) => (inicioX.current = evento.clientX)}
      onPointerUp={(evento) => {
        if (inicioX.current !== null && Math.abs(evento.clientX - inicioX.current) > 40) {
          ir(evento.clientX < inicioX.current ? 1 : -1);
        }
        inicioX.current = null;
      }}
      onPointerCancel={() => (inicioX.current = null)}
    >
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
