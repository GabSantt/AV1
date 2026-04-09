import { pergunta, perguntaOpcao } from "../input";
import {
  listarFuncionarios,
  adicionarFuncionario,
  removerFuncionario,
  buscarPorId
} from "../../services/FuncionarioService";
import { NivelPermissao } from "../../enums/NivelPermissao";
import { temPermissao, getFuncionarioLogado } from "../../services/AuthService";

export function menuFuncionario(): void {
  let sair = false;
  while (!sair) {
    const opcoes = [
      "Listar funcionarios",
      "Cadastrar funcionario",
      "Remover funcionario",
      "Ver detalhes de funcionario",
      "Voltar"
    ];
    const escolha = perguntaOpcao("\nFuncionarios - escolha uma opcao:", opcoes);

    if (escolha === 0) {
      const lista = listarFuncionarios();
      if (lista.length === 0) {
        console.log("Nenhum funcionario cadastrado.");
      } else {
        for (const f of lista) {
          console.log(`[${f.id}] ${f.nome} - ${f.nivelPermissao} - usuario: ${f.usuario}`);
        }
      }
    } else if (escolha === 1) {
      if (!temPermissao(NivelPermissao.ADMINISTRADOR)) {
        console.log("Sem permissao para cadastrar funcionarios.");
        continue;
      }
      const nome = pergunta("Nome: ");
      const telefone = pergunta("Telefone: ");
      const endereco = pergunta("Endereco: ");
      const usuario = pergunta("Usuario: ");
      const senha = pergunta("Senha: ");
      const niveis = [NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO, NivelPermissao.OPERADOR];
      const idxNivel = perguntaOpcao("Nivel de permissao:", niveis);
      const nivel = niveis[idxNivel];
      const ok = adicionarFuncionario(nome, telefone, endereco, usuario, senha, nivel);
      if (ok) {
        console.log("Funcionario cadastrado com sucesso!");
      } else {
        console.log("Usuario ja existe no sistema.");
      }
    } else if (escolha === 2) {
      if (!temPermissao(NivelPermissao.ADMINISTRADOR)) {
        console.log("Sem permissao para remover funcionarios.");
        continue;
      }
      const id = pergunta("ID do funcionario: ");
      const logado = getFuncionarioLogado();
      if (logado && logado.id === id) {
        console.log("Nao e possivel remover o proprio usuario.");
        continue;
      }
      const ok = removerFuncionario(id);
      console.log(ok ? "Removido." : "Funcionario nao encontrado.");
    } else if (escolha === 3) {
      const id = pergunta("ID do funcionario: ");
      const f = buscarPorId(id);
      if (!f) {
        console.log("Nao encontrado.");
      } else {
        console.log("===========================================");
        console.log(`ID:        ${f.id}`);
        console.log(`Nome:      ${f.nome}`);
        console.log(`Telefone:  ${f.telefone}`);
        console.log(`Endereco:  ${f.endereco}`);
        console.log(`Usuario:   ${f.usuario}`);
        console.log(`Permissao: ${f.nivelPermissao}`);
        console.log("===========================================");
      }
    } else {
      sair = true;
    }
  }
}
