import { TipoPeca } from "../enums/TipoPeca";
import { StatusPeca } from "../enums/StatusPeca";

export class Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;

  constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
  }

  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
  }

  salvar(): string {
    return `${this.nome}|${this.tipo}|${this.fornecedor}|${this.status}`;
  }

  static carregar(linha: string): Peca { /*sucoprats*/
    const p = linha.split("|");
    return new Peca(p[0], p[1] as TipoPeca, p[2], p[3] as StatusPeca);
  }
}
