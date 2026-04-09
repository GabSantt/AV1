import { Aeronave } from "./Aeronave";
import * as fs from "fs";
import * as path from "path";

export class Relatorio {
  aeronave: Aeronave;
  nomeCliente: string;
  dataEntrega: string;

  constructor(aeronave: Aeronave, nomeCliente: string, dataEntrega: string) {
    this.aeronave = aeronave;
    this.nomeCliente = nomeCliente;
    this.dataEntrega = dataEntrega;
  }

  gerarRelatorio(): string {
    let txt = "";
    txt += "==================================================\n";
    txt += "         RELATORIO FINAL DE ENTREGA - AEROCODE   \n";
    txt += "==================================================\n";
    txt += `Cliente:       ${this.nomeCliente}\n`;
    txt += `Data Entrega:  ${this.dataEntrega}\n`;
    txt += "--------------------------------------------------\n";
    txt += "AERONAVE\n";
    txt += `  Codigo:      ${this.aeronave.codigo}\n`;
    txt += `  Modelo:      ${this.aeronave.modelo}\n`;
    txt += `  Tipo:        ${this.aeronave.tipo}\n`;
    txt += `  Capacidade:  ${this.aeronave.capacidade}\n`;
    txt += `  Alcance:     ${this.aeronave.alcance} km\n`;
    txt += "--------------------------------------------------\n";
    txt += "PECAS\n";
    if (this.aeronave.pecas.length === 0) {
      txt += "  Nenhuma peca registrada.\n";
    }
    for (const peca of this.aeronave.pecas) {
      txt += `  - ${peca.nome} | ${peca.tipo} | ${peca.fornecedor} | ${peca.status}\n`;
    }
    txt += "--------------------------------------------------\n";
    txt += "ETAPAS\n";
    if (this.aeronave.etapas.length === 0) {
      txt += "  Nenhuma etapa registrada.\n";
    }
    for (const etapa of this.aeronave.etapas) {
      txt += `  - ${etapa.nome} | Prazo: ${etapa.prazo} | Status: ${etapa.status}\n`;
      for (const func of etapa.funcionarios) {
        txt += `      Funcionario: ${func.nome}\n`;
      }
    }
    txt += "--------------------------------------------------\n";
    txt += "TESTES\n";
    if (this.aeronave.testes.length === 0) {
      txt += "  Nenhum teste registrado.\n";
    }
    for (const teste of this.aeronave.testes) {
      txt += `  - ${teste.tipo} | Resultado: ${teste.resultado}\n`;
    }
    txt += "==================================================\n";
    return txt;
  }

  salvarEmArquivo(): void {
    const dir = path.join(process.cwd(), "relatorios");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const nomeArquivo = `relatorio_${this.aeronave.codigo}_${Date.now()}.txt`;
    const caminho = path.join(dir, nomeArquivo);
    fs.writeFileSync(caminho, this.gerarRelatorio(), "utf-8");
    console.log(`Relatorio salvo em: relatorios/${nomeArquivo}`);
  }
}
