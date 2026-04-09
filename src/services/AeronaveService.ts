import { Aeronave } from "../models/Aeronave";
import { Peca } from "../models/Peca";
import { Etapa } from "../models/Etapa";
import { Teste } from "../models/Teste";
import { TipoAeronave } from "../enums/TipoAeronave";
import { salvarLinhas, carregarLinhas } from "../persistence/FileStorage";
import { carregarLinhas as cl } from "../persistence/FileStorage";
import { buscarPorId } from "./FuncionarioService";

const ARQ_AERONAVES = "aeronaves.txt";
const ARQ_PECAS = "pecas.txt";
const ARQ_ETAPAS = "etapas.txt";
const ARQ_TESTES = "testes.txt";

let aeronaves: Aeronave[] = [];

export function carregarTodos(): void {
  const linhasAero = carregarLinhas(ARQ_AERONAVES);
  aeronaves = linhasAero.map(l => Aeronave.carregar(l));

  const linhasPecas = cl(ARQ_PECAS);
  const linhasEtapas = cl(ARQ_ETAPAS);
  const linhasTestes = cl(ARQ_TESTES);

  for (const linha of linhasPecas) {
    const partes = linha.split("||");
    if (partes.length < 2) continue;
    const codigoAero = partes[0];
    const aero = aeronaves.find(a => a.codigo === codigoAero);
    if (aero) {
      aero.pecas.push(Peca.carregar(partes[1]));
    }
  }

  for (const linha of linhasEtapas) {
    const partes = linha.split("||");
    if (partes.length < 2) continue;
    const codigoAero = partes[0];
    const aero = aeronaves.find(a => a.codigo === codigoAero);
    if (aero) {
      const dados = Etapa.carregarBasico(partes[1]);
      const etapa = new Etapa(dados.nome, dados.prazo);
      etapa.status = dados.status;
      for (const id of dados.ids) {
        const func = buscarPorId(id);
        if (func) etapa.funcionarios.push(func);
      }
      aero.etapas.push(etapa);
    }
  }

  for (const linha of linhasTestes) {
    const partes = linha.split("||");
    if (partes.length < 2) continue;
    const codigoAero = partes[0];
    const aero = aeronaves.find(a => a.codigo === codigoAero);
    if (aero) {
      aero.testes.push(Teste.carregar(partes[1]));
    }
  }
}

export function salvarTodos(): void {
  salvarLinhas(ARQ_AERONAVES, aeronaves.map(a => a.salvar()));

  const linhasPecas: string[] = [];
  const linhasEtapas: string[] = [];
  const linhasTestes: string[] = [];

  for (const aero of aeronaves) {
    for (const p of aero.pecas) {
      linhasPecas.push(`${aero.codigo}||${p.salvar()}`);
    }
    for (const e of aero.etapas) {
      linhasEtapas.push(`${aero.codigo}||${e.salvar()}`);
    }
    for (const t of aero.testes) {
      linhasTestes.push(`${aero.codigo}||${t.salvar()}`);
    }
  }

  salvarLinhas(ARQ_PECAS, linhasPecas);
  salvarLinhas(ARQ_ETAPAS, linhasEtapas);
  salvarLinhas(ARQ_TESTES, linhasTestes);
}

export function listarAeronaves(): Aeronave[] {
  return aeronaves;
}

export function buscarAeronave(codigo: string): Aeronave | undefined {
  return aeronaves.find(a => a.codigo === codigo);
}

export function adicionarAeronave(
  codigo: string,
  modelo: string,
  tipo: TipoAeronave,
  capacidade: number,
  alcance: number
): boolean {
  const existe = aeronaves.find(a => a.codigo === codigo);
  if (existe) return false;
  aeronaves.push(new Aeronave(codigo, modelo, tipo, capacidade, alcance));
  salvarTodos();
  return true;
}

export function removerAeronave(codigo: string): boolean {
  const idx = aeronaves.findIndex(a => a.codigo === codigo);
  if (idx === -1) return false;
  aeronaves.splice(idx, 1);
  salvarTodos();
  return true;
}
