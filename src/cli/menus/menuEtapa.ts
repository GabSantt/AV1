import { pergunta, perguntaOpcao } from "../input";
import { buscarAeronave, salvarTodos } from "../../services/AeronaveService";
import { buscarPorId, listarFuncionarios } from "../../services/FuncionarioService";
import { Etapa } from "../../models/Etapa";
import { StatusEtapa } from "../../enums/StatusEtapa";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao } from "../../services/AuthService";

export function menuEtapa(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Adicionar etapa a aeronave",
      "Listar etapas de aeronave",
      "Iniciar etapa",
      "Finalizar etapa",
      "Associar funcionario a etapa",
      "Listar funcionarios de etapa",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nEtapas - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      const nome = pergunta("Nome da etapa: ");
      const prazo = pergunta("Prazo: ");
      aero.etapas.push(new Etapa(nome, prazo));
      salvarTodos();
      console.log("Etapa adicionada!");
    } else if (escolha === 1) {
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      if (aero.etapas.length === 0) { console.log("Sem etapas."); continue; }
      aero.etapas.forEach((e, i) => {
        console.log(`[${i}] ${e.nome} - Prazo: ${e.prazo} - Status: ${e.status}`);
      });
    } else if (escolha === 2) {
      if (!temPermissao(NivelPermissao.OPERADOR)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      aero.etapas.forEach((e, i) => console.log(`[${i}] ${e.nome} - ${e.status}`));
      const idx = parseInt(pergunta("Indice da etapa: "));
      if (isNaN(idx) || idx < 0 || idx >= aero.etapas.length) {
        console.log("Indice invalido.");
        continue;
      }
      if (idx > 0 && aero.etapas[idx - 1].status !== StatusEtapa.CONCLUIDA) {
        console.log("A etapa anterior ainda nao foi concluida.");
        continue;
      }
      aero.etapas[idx].iniciar();
      salvarTodos();
    } else if (escolha === 3) {
      if (!temPermissao(NivelPermissao.OPERADOR)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      aero.etapas.forEach((e, i) => console.log(`[${i}] ${e.nome} - ${e.status}`));
      const idx = parseInt(pergunta("Indice da etapa: "));
      if (isNaN(idx) || idx < 0 || idx >= aero.etapas.length) {
        console.log("Indice invalido.");
        continue;
      }
      aero.etapas[idx].finalizar();
      salvarTodos();
    } else if (escolha === 4) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      aero.etapas.forEach((e, i) => console.log(`[${i}] ${e.nome}`));
      const idx = parseInt(pergunta("Indice da etapa: "));
      if (isNaN(idx) || idx < 0 || idx >= aero.etapas.length) {
        console.log("Indice invalido.");
        continue;
      }
      const funcs = listarFuncionarios();
      if (funcs.length === 0) { console.log("Sem funcionarios cadastrados."); continue; }
      funcs.forEach(f => console.log(`[${f.id}] ${f.nome}`));
      const idFunc = pergunta("ID do funcionario: ");
      const func = buscarPorId(idFunc);
      if (!func) { console.log("Funcionario nao encontrado."); continue; }
      aero.etapas[idx].associarFuncionario(func);
      salvarTodos();
    } else if (escolha === 5) {
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      aero.etapas.forEach((e, i) => console.log(`[${i}] ${e.nome}`));
      const idx = parseInt(pergunta("Indice da etapa: "));
      if (isNaN(idx) || idx < 0 || idx >= aero.etapas.length) {
        console.log("Indice invalido.");
        continue;
      }
      const funcs = aero.etapas[idx].listarFuncionarios();
      if (funcs.length === 0) {
        console.log("Nenhum funcionario associado.");
      } else {
        funcs.forEach(f => console.log(`- ${f.nome} (${f.nivelPermissao})`));
      }
    } else {
      sair = true;
    }
  }
}
