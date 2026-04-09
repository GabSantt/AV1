import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums/NivelPermissao";

let funcionarioLogado: Funcionario | null = null;

export function login(usuario: string, senha: string, funcionarios: Funcionario[]): boolean {
  const encontrado = funcionarios.find(f => f.autenticar(usuario, senha));
  if (encontrado) {
    funcionarioLogado = encontrado;
    return true;
  }
  return false;
}

export function logout(): void {
  funcionarioLogado = null;
}

export function getFuncionarioLogado(): Funcionario | null {
  return funcionarioLogado;
}

export function isLogado(): boolean {
  return funcionarioLogado !== null;
}

export function temPermissao(nivel: NivelPermissao): boolean {
  if (!funcionarioLogado) return false;
  if (funcionarioLogado.nivelPermissao === NivelPermissao.ADMINISTRADOR) return true;
  if (funcionarioLogado.nivelPermissao === NivelPermissao.ENGENHEIRO) {
    return nivel !== NivelPermissao.ADMINISTRADOR;
  }
  return nivel === NivelPermissao.OPERADOR;
}
