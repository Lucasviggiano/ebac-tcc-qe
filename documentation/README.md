# Documentacao de Execucao de Testes

Esta pasta centraliza a documentacao operacional para executar os testes do projeto.

## Objetivo

- explicar como preparar ambiente e rodar todos os testes;
- padronizar comandos para execucao local;
- documentar execucao no GitHub Actions;
- orientar troubleshooting rapido por camada.

## Guias disponiveis

- [Como rodar todos os testes](./how-to-run-all-tests.md)
- [Execucoes no GitHub Actions](./github-actions-test-runs.md)
- [Troubleshooting de testes](./test-troubleshooting.md)

## Convencoes

- Comandos em `bash` funcionam em Linux/macOS e Git Bash.
- Comandos em `powershell` sao para Windows PowerShell.
- Sempre execute os comandos a partir da raiz do repositorio.
- Scripts oficiais de execucao estao no `package.json` raiz e nos `package.json` das camadas em `automation/`.
