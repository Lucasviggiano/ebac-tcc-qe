# CI/CD - TCC-EBAC-QE

Documentacao oficial da pipeline de qualidade no GitHub Actions.

## Workflow em uso

- `.github/workflows/qa-pipeline.yml`

Espelho de referencia (backup documental):

- `ci-cd/github-actions/qa-pipeline.yml`

## Objetivo

Executar validacoes automatizadas por camada com evidencias publicadas como artefatos:

- UI (Cypress)
- API (Jest + Supertest + contratos)
- Performance (k6)
- Mobile Android smoke (Appium + WebdriverIO)
- SQuaRE Gate (ISO/IEC 25010 + 25023 + 25040)

## Gatilhos

- `push` em: `main`, `master`, `develop`, `feat/**`, `codex/**`
- `pull_request` para: `main`, `master`, `develop`
- `workflow_dispatch` com inputs:
  - `run_performance` (boolean)
  - `run_mobile` (boolean)

## Jobs atuais

### 1. `api-tests`

- instala dependencias em `automation/API`
- executa `npm run test:api:all`
- publica artefato `api-evidence` com:
  - `reports/ci/api`
  - `automation/API/coverage` (quando existir)

### 2. `ui-tests`

- executa Cypress no Chrome
- publica artefato `ui-evidence` com:
  - `automation/UI/cypress/screenshots`
  - `automation/UI/cypress/videos`
  - `automation/UI/cypress/downloads`

### 3. `performance-tests`

- instala k6
- executa os 2 cenarios:
  - `login-performance.js`
  - `catalog-performance.js`
- salva logs em `reports/ci/performance`
- publica artefato `performance-evidence` com:
  - `performance/k6/reports`
  - `reports/ci/performance`

### 4. `mobile-android-smoke`

- executa somente via `workflow_dispatch` quando `run_mobile=true`
- sobe emulador Android (API 30)
- instala e inicia Appium 2 + driver `uiautomator2`
- executa `npm run test:smoke`
- gera Allure (`npm run allure:generate`)
- publica artefato `mobile-evidence` com:
  - `reports/ci/mobile`
  - `automation/Mobile/reports/allure-results`
  - `automation/Mobile/reports/allure-report`

### 5. `square-gate`

- consolida resultados dos jobs anteriores (incluindo mobile quando aplicavel)
- executa:
  - `npm run square:gate`
- gera scorecard em:
  - `reports/square/scorecard-YYYY-MM-DD.json`
  - `reports/square/scorecard-YYYY-MM-DD.md`
- publica artefato `square-evidence`
- reprova pipeline quando gate SQuaRE nao for atendido

## Como disparar rodada completa manual

1. Abrir aba **Actions** no GitHub.
2. Selecionar **QA Complete Pipeline**.
3. Clicar em **Run workflow**.
4. Marcar:
   - `run_performance=true`
   - `run_mobile=true`
5. Executar.

## Como validar local antes do push

```bash
npm run test:ui
npm run test:api:all
npm run test:performance
npm run test:mobile:smoke
```
