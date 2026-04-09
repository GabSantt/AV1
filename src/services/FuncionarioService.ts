import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums/NivelPermissao";
import { salvarLinhas, carregarLinhas } from "../persistence/FileStorage";

const ARQUIVO = "funcionarios.txt";
let funcionarios: Funcionario[] = [];

export function carregarFuncionarios(): void {
  const linhas = carregarLinhas(ARQUIVO);
  funcionarios = linhas.map(l => Funcionario.carregar(l));
}

export function salvarFuncionarios(): void {
  salvarLinhas(ARQUIVO, funcionarios.map(f => f.salvar()));
}

export function listarFuncionarios(): Funcionario[] {
  return funcionarios;
}

export function buscarPorId(id: string): Funcionario | undefined {
  return funcionarios.find(f => f.id === id);
}

export function adicionarFuncionario(
  nome: string,
  telefone: string,
  endereco: string,
  usuario: string,
  senha: string,
  nivel: NivelPermissao
): boolean {
  const idExiste = funcionarios.find(f => f.usuario === usuario);
  if (idExiste) return false;

  const novoId = String(Date.now());
  const f = new Funcionario(novoId, nome, telefone, endereco, usuario, senha, nivel);
  funcionarios.push(f);
  salvarFuncionarios();
  return true;
}

export function removerFuncionario(id: string): boolean {
  const idx = funcionarios.findIndex(f => f.id === id);
  if (idx === -1) return false;
  funcionarios.splice(idx, 1);
  salvarFuncionarios();
  return true;
}
