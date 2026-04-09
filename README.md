# Aerocode - Sistema de Producao de Aeronaves

Sistema CLI desenvolvido em TypeScript para gerenciar o processo de producao de aeronaves,
desde o cadastro inicial ate a entrega final ao cliente.

## Requisitos

- Node.js 18 ou superior
- npm

## Instalacao

```bash
npm install
```

## Como executar

### Modo desenvolvimento
```bash
npm run dev
```

### Compilar e executar
```bash
npm run build
npm start
```

## Primeiro acesso

Na primeira execucao, o sistema cria automaticamente um usuario administrador:

- **Usuario:** admin
- **Senha:** admin123

Recomenda-se trocar a senha apos o primeiro login.

## Niveis de permissao

| Nivel         | Acesso                                              |
|---------------|-----------------------------------------------------|
| ADMINISTRADOR | Acesso total, incluindo gerenciar funcionarios      |
| ENGENHEIRO    | Aeronaves, pecas, etapas, testes e relatorios       |
| OPERADOR      | Iniciar/finalizar etapas e atualizar status de pecas|

## Persistencia

Os dados sao salvos automaticamente na pasta `data/` em arquivos de texto puro.
Os relatorios de entrega sao salvos na pasta `relatorios/`.

## Compatibilidade

- Windows 10 ou superior
- Linux Ubuntu 24.04 ou superior
- Distribuicoes derivadas do Ubuntu

<!-- sucoprats -->
