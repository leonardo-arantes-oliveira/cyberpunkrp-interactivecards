export type Stat = {
  rotulo: string;
  valor: number;
};

export type LinhaMeta = {
  rotulo: string;
  valor: string;
};

export type Capitulo = {
  titulo: string;
  paragrafos?: string[];
  linhas?: LinhaMeta[];
  citacao?: string;
};

export type Personagem = {
  /** nome da pasta em src/data/personagens */
  slug: string;
  id: string;
  nome: string;
  alias?: string;
  origem: string;
  /** pode ter várias habilidades (atributos) */
  habilidades: string[];
  /** pode ter várias builds */
  builds: string[];
  resumo: string;
  /** deslocamento de matiz (graus) usado nas variações de enquadramento */
  matiz: number;
  stats: Stat[];
  meta: LinhaMeta[];
  capitulos: Capitulo[];
  /** URLs já resolvidas, na ordem definida no JSON (ou alfabética) */
  imagens: string[];
};
