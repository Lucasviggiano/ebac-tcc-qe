# Mobile Report - 2026-04-15

## 1. Escopo

Execucao da camada Mobile Android (Appium + WDIO), cenario smoke de catalogo.

## 2. Comando executado

```bash
npm run test:mobile:smoke
```

## 3. Resultado

- status: **FAIL**
- codigo de saida: `1`
- worker iniciado: `1`
- erro principal: `Error: spawn EPERM`

Fonte: `reports/evidence/runs/2026-04-15-full/logs/03-mobile-smoke.log`

## 4. Analise de impacto

- a execucao nao chegou na fase de validacao funcional do app;
- falha associada a permissao de spawn/processo local, nao a regra de negocio do catalogo.

## 5. Acao recomendada

- revisar permissao de execucao e dependencias do host (Node/Appium/WDIO);
- reexecutar o smoke para gerar evidencia funcional e Allure atualizado.

## 6. Evidencias

- log completo: `reports/evidence/runs/2026-04-15-full/logs/03-mobile-smoke.log`
- ambiente da rodada: `reports/evidence/runs/2026-04-15-full/logs/00-environment.txt`
