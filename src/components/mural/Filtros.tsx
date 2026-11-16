"use client";

import { Icone, iconeDe, type Grupo } from "./icones";

export type Ordem = "az" | "id";

type Props = {
  busca: string;
  onBusca: (valor: string) => void;
  origens: string[];
  origem: string;
  onOrigem: (valor: string) => void;
  habilidades: string[];
  habilidade: string;
  onHabilidade: (valor: string) => void;
  builds: string[];
  build: string;
  onBuild: (valor: string) => void;
  ordem: Ordem;
  onOrdem: (valor: Ordem) => void;
};

type ChipProps = {
  valor: string;
  atual: string;
  grupo: Grupo;
  onEscolher: (valor: string) => void;
};

function Chip({ valor, atual, grupo, onEscolher }: ChipProps) {
  const ativo = atual === valor;
  return (
    <button
      type="button"
      className="m-chip"
      data-on={ativo}
      aria-pressed={ativo}
      onClick={() => onEscolher(valor)}
    >
      {valor ? <Icone nome={iconeDe(valor, grupo)} /> : null}
      {valor || (grupo === "origem" ? "Todos" : grupo === "habilidade" ? "Todas" : "Todas")}
    </button>
  );
}

export function Filtros({
  busca,
  onBusca,
  origens,
  origem,
  onOrigem,
  habilidades,
  habilidade,
  onHabilidade,
  builds,
  build,
  onBuild,
  ordem,
  onOrdem,
}: Props) {
  return (
    <section className="m-filtros" aria-label="Filtros do mural">
      <p className="m-eyebrow m-filtros-label">
        <Icone nome="collection" />
        {"/// afl.filtros · refinar banco de dados"}
      </p>

      <div className="m-bar">
        <div className="m-field m-field--busca">
          <span className="m-field-head" id="rotulo-busca">
            <Icone nome="search" />
            Buscar
          </span>
          <input
            className="m-search"
            type="search"
            value={busca}
            onChange={(evento) => onBusca(evento.target.value)}
            placeholder="Buscar personagem"
            aria-labelledby="rotulo-busca"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="m-field m-field--ordem">
          <span className="m-field-head" id="rotulo-ordem">
            <Icone nome="sort-down" />
            Ordenar
          </span>
          <select
            className="m-select"
            aria-labelledby="rotulo-ordem"
            value={ordem}
            onChange={(evento) => onOrdem(evento.target.value as Ordem)}
          >
            <option value="az">Nome A–Z</option>
            <option value="id">ID</option>
          </select>
        </div>
      </div>

      <div className="m-bar m-bar--grupos">
        <div className="m-group m-group--origem">
          <span className="m-field-head" id="rotulo-origem">
            <Icone nome="baby" />
            Origem
          </span>
          <div className="m-chips" role="group" aria-labelledby="rotulo-origem">
            <Chip valor="" atual={origem} grupo="origem" onEscolher={onOrigem} />
            {origens.map((valor) => (
              <Chip
                key={valor}
                valor={valor}
                atual={origem}
                grupo="origem"
                onEscolher={onOrigem}
              />
            ))}
          </div>
        </div>

        <div className="m-group m-group--hab">
          <span className="m-field-head" id="rotulo-habilidade">
            <Icone nome="activity" />
            Habilidades
          </span>
          <div className="m-chips" role="group" aria-labelledby="rotulo-habilidade">
            <Chip valor="" atual={habilidade} grupo="habilidade" onEscolher={onHabilidade} />
            {habilidades.map((valor) => (
              <Chip
                key={valor}
                valor={valor}
                atual={habilidade}
                grupo="habilidade"
                onEscolher={onHabilidade}
              />
            ))}
          </div>
        </div>

        <div className="m-group m-group--build">
          <span className="m-field-head" id="rotulo-build">
            <Icone nome="robot" />
            Builds
          </span>
          <div className="m-chips" role="group" aria-labelledby="rotulo-build">
            <Chip valor="" atual={build} grupo="build" onEscolher={onBuild} />
            {builds.map((valor) => (
              <Chip key={valor} valor={valor} atual={build} grupo="build" onEscolher={onBuild} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
