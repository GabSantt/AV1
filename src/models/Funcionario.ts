import { NivelPermissao } from "../enums/NivelPermissao";

export class Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;

  constructor(
    id: string,
    nome: string,
    telefone: string,
    endereco: string,
    usuario: string,
    senha: string,
    nivelPermissao: NivelPermissao
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.usuario = usuario;
    this.senha = senha;
    this.nivelPermissao = nivelPermissao;
  }

  autenticar(usuario: string, senha: string): boolean {
    return this.usuario === usuario && this.senha === senha;
  }

  salvar(): string {
    return `${this.id}|${this.nome}|${this.telefone}|${this.endereco}|${this.usuario}|${this.senha}|${this.nivelPermissao}`;
  }

  static carregar(linha: string): Funcionario {
    const partes = linha.split("|");
    return new Funcionario(
      partes[0],
      partes[1],
      partes[2],
      partes[3],
      partes[4],
      partes[5],
      partes[6] as NivelPermissao
    );
  }
}
