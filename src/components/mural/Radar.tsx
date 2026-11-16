import type { Atributo } from "@/lib/atributos";

const CX = 210;
const CY = 150;
const RAIO = 100;
const ANEIS = [20, 40, 60, 80, 100];

/** Nomes curtos e quebra em duas linhas para caberem ao redor do pentágono. */
const ROTULOS: Record<string, string[]> = {
  "Habilidade Técnica": ["Técnica"],
  "Moral / Sangue Frio": ["Sangue", "Frio"],
};

const LINHA = 15;

function ponto(indice: number, total: number, raio: number) {
  const angulo = -Math.PI / 2 + (indice * 2 * Math.PI) / total;
  return { x: CX + Math.cos(angulo) * raio, y: CY + Math.sin(angulo) * raio };
}

function poligono(valores: number[], raio: number) {
  return valores
    .map((valor, indice) => {
      const p = ponto(indice, valores.length, (raio * valor) / 100);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");
}

/** Star plot dos cinco atributos, um eixo por habilidade do filtro. */
export function Radar({ atributos }: { atributos: Atributo[] }) {
  const total = atributos.length;
  const valores = atributos.map((atributo) => atributo.valor);
  const anel = Array.from({ length: total }, () => 100);

  return (
    <svg
      className="m-radar"
      viewBox="0 0 420 310"
      role="img"
      aria-label={`Perfil de atributos: ${atributos
        .map((atributo) => `${atributo.rotulo} ${atributo.valor}`)
        .join(", ")}`}
    >
      <g aria-hidden="true">
        {ANEIS.map((valor) => (
          <polygon
            key={valor}
            points={poligono(anel, (RAIO * valor) / 100)}
            className="m-radar-anel"
            data-externo={valor === 100}
          />
        ))}
        {atributos.map((atributo, indice) => {
          const fim = ponto(indice, total, RAIO);
          return (
            <line
              key={atributo.rotulo}
              x1={CX}
              y1={CY}
              x2={fim.x}
              y2={fim.y}
              className="m-radar-eixo"
            />
          );
        })}
      </g>

      <g className="m-radar-dados">
        <polygon points={poligono(valores, RAIO)} className="m-radar-area" />
        <polygon points={poligono(valores, RAIO)} className="m-radar-linha" />
        {atributos.map((atributo, indice) => {
          const p = ponto(indice, total, (RAIO * atributo.valor) / 100);
          return (
            <circle
              key={atributo.rotulo}
              cx={p.x}
              cy={p.y}
              r={3.2}
              className="m-radar-ponto"
            />
          );
        })}
      </g>

      {atributos.map((atributo, indice) => {
        const p = ponto(indice, total, RAIO + 18);
        const ancora = p.x > CX + 8 ? "start" : p.x < CX - 8 ? "end" : "middle";
        const linhas = ROTULOS[atributo.rotulo] ?? [atributo.rotulo];
        return (
          <g key={atributo.rotulo}>
            {linhas.map((linha, i) => (
              <text
                key={linha}
                x={p.x}
                y={p.y + i * LINHA}
                textAnchor={ancora}
                className="m-radar-lab"
              >
                {linha}
              </text>
            ))}
            <text
              x={p.x}
              y={p.y + linhas.length * LINHA}
              textAnchor={ancora}
              className="m-radar-num"
            >
              {atributo.valor}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
