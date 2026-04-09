import { perguntaOpcao } from "../input";
import { menuAeronave } from "./menuAeronave";
import { menuPeca } from "./menuPeca";
import { menuEtapa } from "./menuEtapa";
import { menuFuncionario } from "./menuFuncionario";
import { menuTeste } from "./menuTeste";
import { menuRelatorio } from "./menuRelatorio";
import { getFuncionarioLogado, logout } from "../../services/AuthService";

export function menuPrincipal(): void {
  let sair = false;
  while (!sair) {
    const logado = getFuncionarioLogado();
    console.log(`\nUsuario: ${logado?.nome} (${logado?.nivelPermissao})`);
    const opcoes = [
      "Aeronaves",
      "Pecas",
      "Etapas",
      "Funcionarios",
      "Testes",
      "Relatorios",
      "Sair / Logout"
    ];
    const escolha = perguntaOpcao("Menu Principal:", opcoes);

    if (escolha === 0) menuAeronave();
    else if (escolha === 1) menuPeca();
    else if (escolha === 2) menuEtapa();
    else if (escolha === 3) menuFuncionario();
    else if (escolha === 4) menuTeste();
    else if (escolha === 5) menuRelatorio();
    else {
      logout();
      sair = true;
    }
  }
}
