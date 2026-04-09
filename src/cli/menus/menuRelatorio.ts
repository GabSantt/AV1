import { pergunta, perguntaOpcao } from "../input";
import { buscarAeronave } from "../../services/AeronaveService";
import { Relatorio } from "../../models/Relatorio";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao } from "../../services/AuthService";

export function menuRelatorio(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Gerar relatorio de entrega",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nRelatorios - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao para gerar relatorios.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) {
        console.log("Aeronave nao encontrada.");
        continue;
      }
      const nomeCliente = pergunta("Nome do cliente: ");
      const dataEntrega = pergunta("Data de entrega (ex: 2025-12-31): ");
      const relatorio = new Relatorio(aero, nomeCliente, dataEntrega);
      console.log("\n" + relatorio.gerarRelatorio());
      relatorio.salvarEmArquivo();
    } else {
      sair = true;
    }
  }
}
