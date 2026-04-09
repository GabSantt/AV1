import { pergunta, perguntaOpcao } from "../input";
import { buscarAeronave, salvarTodos } from "../../services/AeronaveService";
import { Peca } from "../../models/Peca";
import { TipoPeca } from "../../enums/TipoPeca";
import { StatusPeca } from "../../enums/StatusPeca";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao } from "../../services/AuthService";

export function menuPeca(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Adicionar peca a aeronave",
      "Listar pecas de aeronave",
      "Atualizar status de peca",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nPecas - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) {
        console.log("Aeronave nao encontrada.");
        continue;
      }
      const nome = pergunta("Nome da peca: ");
      const tipos = [TipoPeca.NACIONAL, TipoPeca.IMPORTADA];
      const idxTipo = perguntaOpcao("Tipo:", tipos);
      const fornecedor = pergunta("Fornecedor: ");
      const statusOpts = [StatusPeca.EM_PRODUCAO, StatusPeca.EM_TRANSPORTE, StatusPeca.PRONTA];
      const idxStatus = perguntaOpcao("Status:", statusOpts);
      const peca = new Peca(nome, tipos[idxTipo], fornecedor, statusOpts[idxStatus]);
      aero.pecas.push(peca);
      salvarTodos();
      console.log("Peca adicionada!");
    } else if (escolha === 1) {
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) {
        console.log("Aeronave nao encontrada.");
        continue;
      }
      if (aero.pecas.length === 0) {
        console.log("Nenhuma peca cadastrada.");
      } else {
        aero.pecas.forEach((p, i) => {
          console.log(`[${i}] ${p.nome} - ${p.tipo} - ${p.fornecedor} - ${p.status}`);
        });
      }
    } else if (escolha === 2) {
      if (!temPermissao(NivelPermissao.OPERADOR)) {
        console.log("Sem permissao.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) {
        console.log("Aeronave nao encontrada.");
        continue;
      }
      if (aero.pecas.length === 0) {
        console.log("Sem pecas.");
        continue;
      }
      aero.pecas.forEach((p, i) => console.log(`[${i}] ${p.nome} - ${p.status}`));
      const idxPeca = parseInt(pergunta("Indice da peca: "));
      if (isNaN(idxPeca) || idxPeca < 0 || idxPeca >= aero.pecas.length) {
        console.log("Indice invalido.");
        continue;
      }
      const statusOpts = [StatusPeca.EM_PRODUCAO, StatusPeca.EM_TRANSPORTE, StatusPeca.PRONTA];
      const idxStatus = perguntaOpcao("Novo status:", statusOpts);
      aero.pecas[idxPeca].atualizarStatus(statusOpts[idxStatus]);
      salvarTodos();
      console.log("Status atualizado.");
    } else {
      sair = true;
    }
  }
}
