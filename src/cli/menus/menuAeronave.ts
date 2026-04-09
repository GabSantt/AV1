import { pergunta, perguntaOpcao } from "../input";
import {
  listarAeronaves,
  adicionarAeronave,
  removerAeronave,
  buscarAeronave,
  salvarTodos
} from "../../services/AeronaveService";
import { TipoAeronave } from "../../enums/TipoAeronave";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao } from "../../services/AuthService";

export function menuAeronave(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Listar aeronaves",
      "Cadastrar aeronave",
      "Ver detalhes de aeronave",
      "Remover aeronave",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nAeronaves - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      const lista = listarAeronaves();
      if (lista.length === 0) {
        console.log("Nenhuma aeronave cadastrada.");
      } else {
        for (const a of lista) {
          console.log(`[${a.codigo}] ${a.modelo} - ${a.tipo}`);
        }
      }
    } else if (escolha === 1) {
      if (!temPermissao(NivelPermissao.ENGENHEIRO)) {
        console.log("Sem permissao para cadastrar aeronaves.");
        continue;
      }
      const codigo = pergunta("Codigo: ");
      const modelo = pergunta("Modelo: ");
      const tipos = [TipoAeronave.COMERCIAL, TipoAeronave.MILITAR];
      const idxTipo = perguntaOpcao("Tipo:", tipos);
      const tipo = tipos[idxTipo];
      const capacidade = parseInt(pergunta("Capacidade: "));
      const alcance = parseInt(pergunta("Alcance (km): "));
      const ok = adicionarAeronave(codigo, modelo, tipo, capacidade, alcance);
      if (ok) {
        console.log("Aeronave cadastrada!");
      } else {
        console.log("Ja existe uma aeronave com esse codigo.");
      }
    } else if (escolha === 2) {
      const codigo = pergunta("Codigo da aeronave: ");
      const aero = buscarAeronave(codigo);
      if (!aero) {
        console.log("Aeronave nao encontrada.");
      } else {
        aero.detalhes();
      }
    } else if (escolha === 3) {
      if (!temPermissao(NivelPermissao.ADMINISTRADOR)) {
        console.log("Sem permissao para remover aeronaves.");
        continue;
      }
      const codigo = pergunta("Codigo da aeronave: ");
      const ok = removerAeronave(codigo);
      console.log(ok ? "Aeronave removida." : "Nao encontrada.");
    } else {
      sair = true;
    }
  }
}
