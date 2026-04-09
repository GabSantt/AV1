import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ResultadoTeste";

export class Teste {
  tipo: TipoTeste;
  resultado: ResultadoTeste;

  constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
    this.tipo = tipo;
    this.resultado = resultado;
  }

  salvar(): string {
    return `${this.tipo}|${this.resultado}`;
  }

  static carregar(linha: string): Teste {
    const p = linha.split("|");
    return new Teste(p[0] as TipoTeste, p[1] as ResultadoTeste);
  }
}
