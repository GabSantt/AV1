import { pergunta, perguntaOpcao } from "../input";
import { buscarAeronave, salvarTodos } from "../../services/AeronaveService";
import { Teste } from "../../models/Teste";
import { TipoTeste } from "../../enums/TipoTeste";
import { ResultadoTeste } from "../../enums/ResultadoTeste";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao } from "../../services/AuthService";

export function menuTeste(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Registrar teste em aeronave",
      "Listar testes de aeronave",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nTestes - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao para registrar testes.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      const tipoOpts = [TipoTeste.ELETRICO, TipoTeste.HIDRAULICO, TipoTeste.AERODINAMICO];
      const idxTipo = perguntaOpcao("Tipo de teste:", tipoOpts);
      const resultOpts = [ResultadoTeste.APROVADO, ResultadoTeste.REPROVADO];
      const idxResult = perguntaOpcao("Resultado:", resultOpts);
      aero.testes.push(new Teste(tipoOpts[idxTipo], resultOpts[idxResult]));
      salvarTodos();
      console.log("Teste registrado!");
    } else if (escolha === 1) {
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) { console.log("Aeronave nao encontrada."); continue; }
      if (aero.testes.length === 0) {
        console.log("Nenhum teste registrado.");
      } else {
        aero.testes.forEach((t, i) => {
          console.log(`[${i}] ${t.tipo} - ${t.resultado}`);
        });
      }
    } else {
      sair = true;
    }
  }
}
