import { carregarFuncionarios, adicionarFuncionario, listarFuncionarios } from "./services/FuncionarioService";
import { carregarTodos } from "./services/AeronaveService";
import { login, isLogado } from "./services/AuthService";
import { menuPrincipal } from "./cli/menus/menuPrincipal";
import { NivelPermissao } from "./enums/NivelPermissao";
import { pergunta } from "./cli/input";

function inicializar(): void {
  carregarFuncionarios();
  carregarTodos();

  const funcionarios = listarFuncionarios();
  if (funcionarios.length === 0) {
    console.log("Nenhum usuario encontrado. Criando admin padrao...");
    adicionarFuncionario(
      "Administrador",
      "00000000000",
      "Sede Aerocode",
      "admin",
      "admin123",
      NivelPermissao.ADMINISTRADOR
    );
    console.log("Usuario criado: admin / admin123");
  }
}

function telaLogin(): void {
  console.log("===========================================");
  console.log("       AEROCODE - Sistema de Producao     ");
  console.log("===========================================");

  let tentativas = 0;
  while (!isLogado()) {
    if (tentativas >= 3) {
      console.log("Muitas tentativas. Encerrando.");
      process.exit(0);
    }
    const usuario = pergunta("Usuario: ");
    const senha = pergunta("Senha: ");
    const { listarFuncionarios } = require("./services/FuncionarioService");
    const ok = login(usuario, senha, listarFuncionarios());
    if (ok) {
      console.log("Login realizado com sucesso!\n");
    } else {
      console.log("Usuario ou senha incorretos.");
      tentativas++;
    }
  }
}

function main(): void {
  inicializar();
  while (true) {
    telaLogin();
    menuPrincipal();
    console.log("Sessao encerrada.\n");
  }
}

main();
