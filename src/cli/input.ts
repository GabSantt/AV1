import readlineSync from "readline-sync";

export function pergunta(msg: string): string {
  return readlineSync.question(msg).trim();
}

export function perguntaOpcao(msg: string, opcoes: string[]): number {
  return readlineSync.keyInSelect(opcoes, msg, { cancel: false });
}

export function confirmar(msg: string): boolean {
  return readlineSync.keyInYN(msg) as boolean;
}
