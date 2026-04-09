import { StatusEtapa } from "../enums/StatusEtapa";
import { Funcionario } from "./Funcionario";

export class Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
  funcionarios: Funcionario[];

  constructor(nome: string, prazo: string) {
    this.nome = nome;
    this.prazo = prazo;
    this.status = StatusEtapa.PENDENTE;
    this.funcionarios = [];
  }

  iniciar(): void {
    if (this.status !== StatusEtapa.PENDENTE) {
      console.log("Essa etapa nao pode ser iniciada.");
      return;
    }
    this.status = StatusEtapa.ANDAMENTO;
  }

  finalizar(): void {
    if (this.status !== StatusEtapa.ANDAMENTO) {
      console.log("Etapa precisa estar em andamento pra ser concluida.");
      return;
    }
    this.status = StatusEtapa.CONCLUIDA;
  }

  associarFuncionario(f: Funcionario): void {
    const jaExiste = this.funcionarios.find(func => func.id === f.id);
    if (jaExiste) {
      console.log("Funcionario ja esta associado nessa etapa.");
      return;
    }
    this.funcionarios.push(f);
  }

  listarFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  salvar(): string {
    const ids = this.funcionarios.map(f => f.id).join(",");
    return `${this.nome}|${this.prazo}|${this.status}|${ids}`;
  }

  static carregarBasico(linha: string): { nome: string; prazo: string; status: StatusEtapa; ids: string[] } {
    const p = linha.split("|");
    const ids = p[3] ? p[3].split(",").filter(i => i !== "") : [];
    return {
      nome: p[0],
      prazo: p[1],
      status: p[2] as StatusEtapa,
      ids
    };
  }
}
