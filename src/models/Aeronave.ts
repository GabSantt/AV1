import { TipoAeronave } from "../enums/TipoAeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";

export class Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];

  constructor(
    codigo: string,
    modelo: string,
    tipo: TipoAeronave,
    capacidade: number,
    alcance: number
  ) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
    this.pecas = [];
    this.etapas = [];
    this.testes = [];
  }

  detalhes(): void {
    console.log("===========================================");
    console.log(`Codigo:     ${this.codigo}`);
    console.log(`Modelo:     ${this.modelo}`);
    console.log(`Tipo:       ${this.tipo}`);
    console.log(`Capacidade: ${this.capacidade}`);
    console.log(`Alcance:    ${this.alcance} km`);
    console.log(`Pecas:      ${this.pecas.length}`);
    console.log(`Etapas:     ${this.etapas.length}`);
    console.log(`Testes:     ${this.testes.length}`);
    console.log("===========================================");
  }

  salvar(): string {
    return `${this.codigo}|${this.modelo}|${this.tipo}|${this.capacidade}|${this.alcance}`;
  }

  static carregar(linha: string): Aeronave {
    const p = linha.split("|");
    return new Aeronave(
      p[0],
      p[1],
      p[2] as TipoAeronave,
      Number(p[3]),
      Number(p[4])
    );
  }
}
