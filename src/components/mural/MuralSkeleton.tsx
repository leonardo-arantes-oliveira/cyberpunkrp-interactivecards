import Image from "next/image";
import { caminhoPublico } from "@/lib/caminhos";

export function MuralSkeleton() {
  return (
    <div className="mural" aria-busy="true">
      <header className="m-top">
        <span className="m-logo">
          <Image
            src={caminhoPublico("/logo.png")}
            alt="Afterlife Roleplay"
            width={160}
            height={53}
          />
        </span>
        <p className="m-eyebrow">{"/// afterlife//rp · sincronizando"}</p>
        <h1 className="m-title">
          Mural de <em>personagens</em>
        </h1>
        <p className="m-sub">
          Cada ficha é um dossiê fechado. A história completa só abre dentro do card.
        </p>
      </header>

      <div className="m-grid">
        {Array.from({ length: 6 }).map((_, indice) => (
          <div key={indice} className="m-skel">
            <div className="m-skel-img" />
            <div className="m-skel-line m-skel-line--short" />
            <div className="m-skel-line m-skel-line--long" />
            <div className="m-skel-line" />
            <div className="m-skel-btn" />
          </div>
        ))}
      </div>

      <p className="sr-only" role="status">
        Carregando fichas…
      </p>
    </div>
  );
}
