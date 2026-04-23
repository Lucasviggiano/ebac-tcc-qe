# TCC-EBAC-QE

Projeto de Trabalho de Conclusao de Curso da trilha de Quality Engineering (EBAC), com foco na validacao do e-commerce EBAC Shop por meio de planejamento de testes, automacao multi-camada e pipeline de CI.

[versão do TCC em pdf](documentation/Trabalho%20de%20conclusao%20-%20Engenheiro%20de%20Qualidade%20de%20software%20(2)%20(1).pdf)

## Sumario

- [Visao geral](#visao-geral)
- [Escopo funcional](#escopo-funcional)
- [Praticas de qualidade utilizadas](#praticas-de-qualidade-utilizadas)
- [Arquitetura do repositorio](#arquitetura-do-repositorio)
- [Tecnologias e ferramentas](#tecnologias-e-ferramentas)
- [Pre-requisitos](#pre-requisitos)
- [Setup local](#setup-local)
- [Execucao dos testes](#execucao-dos-testes)
- [Documentacao de Execucao de Testes](#documentacao-de-execucao-de-testes)
- [CI/CD no GitHub Actions](#cicd-no-github-actions)
- [Evidencias e relatorios](#evidencias-e-relatorios)
- [Rastreabilidade com os requisitos do PDF](#rastreabilidade-com-os-requisitos-do-pdf)
- [Playbook operacional](#playbook-operacional)
- [Troubleshooting](#troubleshooting)
- [Material textual do TCC](#material-textual-do-tcc)
- [Autor](#autor)

## Visao geral

Objetivo principal do projeto:

- consolidar a estrategia de testes ponta a ponta;
- transformar criterios de aceitacao em cenarios testaveis;
- garantir rastreabilidade entre requisito, caso de teste e automacao;
- executar testes funcionais (UI/API/Mobile) e nao funcionais (performance);
- disponibilizar evidencias para avaliacao de banca/tutor.

Sistema testado:

- ambiente remoto principal:
 `http://lojaebac.ebaconline.art.br/`;
- opcao de ambiente local (documentada): imagens Docker `ernestosbarbosa/lojaebac` e `ernestosbarbosa/lojaebacdb`.

## Escopo funcional

Historias cobertas no planejamento:

- US001: adicionar item ao carrinho;
- US002: login na plataforma;
- US003: API de cupons;
- US004: catalogo de produtos;
- US005: painel Minha Conta;
- US006: Meus Pedidos;
- US007: Enderecos;
- US008: Detalhes da Conta.

Arquivos de referencia:

- criterios de aceitacao: `planning/acceptance-criteria/`;
- casos de teste: `planning/test-cases/`.

## Praticas de qualidade utilizadas

### 1 Estrategia e planejamento

- estrategia de testes formalizada em `planning/test-strategy/test-strategy.md`;
- riscos e prioridades em `planning/test-strategy/risks-and-priorities.md`;
- mapa mental textual e visual em `planning/test-strategy/test-mind-map.md` e `planning/test-strategy/assets/test-mind-map.svg`.

### 2 Priorizacao baseada em risco

Formula aplicada (documentada em `docs/prioritization-criteria.md`):

`Prioridade = Impacto no negocio + Risco tecnico + Probabilidade de regressao`

### 3 Tecnicas de design de teste

- particao de equivalencia;
- analise de valor limite;
- tabela de decisao;
- abordagem orientada a risco.

### 4 Padroes de automacao (testing patterns)

- UI: Page Object + App Actions;
- API: API Client + validacao de contrato por schema (AJV);
- Mobile: Screen Object Pattern.

Documentacao:

- `docs/used-patterns.md`;
- `docs/automation-architecture.md`.

### 5 Qualidade de regressao e cobertura

- checklist de regressao em `docs/regression-checklist.md`;
- cobertura por suites principais com cenarios feliz, alternativo e negativo para historias centrais;
- validacao de contratos nas respostas da API de cupons.

### 6 Boas praticas de dados e configuracao

- massa versionada para performance em `performance/k6/data/users.json`;
- uso de `.env.example` por camada para padronizacao de variaveis;
- padronizacao de scripts NPM no root para execucao local e CI.

### 7 Qualidade de pipeline e evidencias

- workflow CI com jobs separados por camada;
- publicacao de artefatos de execucao;
- suporte a relatorios (Cypress, Allure, k6 summary, logs API).

## Arquitetura do repositorio

```text
.
|-- .github/
|   `-- workflows/
|       `-- qa-pipeline.yml
|-- automation/
|   |-- UI/
|   |-- API/
|   `-- Mobile/
|-- performance/
|   `-- k6/
|-- planning/
|   |-- acceptance-criteria/
|   |-- test-cases/
|   `-- test-strategy/
|-- docs/
|-- manual/
|   `-- tcc/
|-- tools/
|   `-- python-test-runner/
|-- package.json
`-- README.md
```

## Tecnologias e ferramentas

Web/UI:

- Cypress.

API:

- Supertest;
- Jest;
- AJV (JSON Schema validation).

Mobile:

- Appium;
- WebdriverIO;
- Mocha;
- Allure.

Performance:

- k6.

CI/CD:

- GitHub Actions.

Suporte:

- Node.js + npm;
- Python (opcional, para dashboard Streamlit do runner local).

## Pre-requisitos

Minimo recomendado:

- Node.js 20+;
- npm 10+;
- Java/JDK e Android SDK (para execucao mobile local);
- Appium (instalado via dependencias/scripts do projeto);
- k6 (para testes de performance);
- Python 3.10+ (somente para o runner com pagina Python).

## Setup local

No diretorio raiz do projeto:

```bash
npm ci
npm --prefix automation/UI ci
npm --prefix automation/API ci
npm --prefix automation/Mobile ci
```

Para API, opcionalmente copie o arquivo de variaveis:

```bash
cp automation/API/.env.example automation/API/.env
```

No PowerShell (Windows), pode usar:

```powershell
Copy-Item automation/API/.env.example automation/API/.env
```

## Execucao dos testes

### Scripts principais no root

```bash
npm run test:ui
npm run test:ui:open
npm run test:api
npm run test:api:all
npm run test:api:contracts
npm run test:mobile
npm run test:mobile:android
npm run test:mobile:smoke
npm run test:mobile:catalog
npm run test:performance:login
npm run test:performance:catalog
npm run test:performance
npm run test:all
```

### Scripts por camada

UI (`automation/UI/package.json`):

- `npm --prefix automation/UI run test:ui`
- `npm --prefix automation/UI run test:ui:open`

API (`automation/API/package.json`):

- `npm --prefix automation/API run test:api`
- `npm --prefix automation/API run test:api:coupons`
- `npm --prefix automation/API run test:api:contracts`
- `npm --prefix automation/API run test:api:coverage`

Mobile (`automation/Mobile/package.json`):

- `npm --prefix automation/Mobile run test:android`
- `npm --prefix automation/Mobile run test:smoke`
- `npm --prefix automation/Mobile run test:catalog`
- `npm --prefix automation/Mobile run allure:generate`
- `npm --prefix automation/Mobile run allure:open`

Performance (k6):

- `k6 run performance/k6/login-performance.js`
- `k6 run performance/k6/catalog-performance.js`

### Runner com pagina Python (opcional)

```powershell
py -3 -m pip install -r tools/python-test-runner/requirements.txt
py -3 -m streamlit run tools/python-test-runner/app.py
```

Referencia: `tools/python-test-runner/README.md`

## Documentacao de Execucao de Testes

Para instrucoes operacionais completas e atualizadas (setup, comandos por camada, CI e troubleshooting), consulte:

- `documentation/README.md`
- `documentation/how-to-run-all-tests.md`
- `documentation/github-actions-test-runs.md`
- `documentation/test-troubleshooting.md`

## CI/CD no GitHub Actions

Workflow principal:

- `.github/workflows/qa-pipeline.yml`

Gatilhos:

- `push` para `main`, `master`, `develop`, `feat/**` e `codex/**`;
- `pull_request` para `main`, `master`, `develop`;
- `workflow_dispatch` com inputs `run_performance` e `run_mobile`.

Jobs:

- API Tests - Supertest;
- UI Tests - Cypress;
- Performance Tests - k6;

Observacao:

- Atualmente a pipeline principal nao executa o job mobile.
- A execucao mobile permanece documentada para uso local.

Artefatos publicados:

- `api-evidence` (logs + coverage quando existir);
- `ui-evidence` (screenshots/videos/downloads);
- `performance-evidence` (summaries k6 + logs).

## Evidencias e relatorios

Locais relevantes de saida:

- UI: `automation/UI/cypress/screenshots` e `automation/UI/cypress/videos`;
- API: `reports/ci/api` + cobertura quando aplicavel;
- Mobile: `reports/ci/mobile`, `automation/Mobile/reports/allure-results` e `automation/Mobile/reports/allure-report`;
- k6: `performance/k6/reports/*.json`;
- logs de pipeline: `reports/ci/<camada>/`;
- runner Python: `reports/runner/<timestamp>/`.

## Rastreabilidade com os requisitos do PDF

Cobertura consolidada dos itens 4.1 a 4.7 e secoes textuais:

- `docs/pdf-requirements-traceability.md`

Mapeamento resumido:

- 4.1: estrategia de teste e mapa mental;
- 4.2: criterios de aceitacao em Gherkin;
- 4.3: casos de teste;
- 4.5: automacoes UI, API e Mobile;
- 4.6: CI com GitHub Actions;
- 4.7: performance com k6.

## Playbook operacional

Para execucao padronizada ponta a ponta (setup, ordem recomendada, criterios de aprovacao e troubleshooting):

- `docs/execution-playbook.md`

Documentacao complementar:

- `docs/README.md`
- `ci-cd/README.md`
- `performance/README.md`
- `reports/README.md`

## Troubleshooting

### API de cupons com resposta 5xx

- A suite API aplica `ENV-SKIP` para indisponibilidade de ambiente, evitando falso negativo.
- Quando a API responde normalmente, os asserts de regra de negocio e contrato sao aplicados de forma estrita.

### Falha por dependencias ausentes

- execute novamente `npm ci` no root e por camada;
- valide Node/npm (`node -v` e `npm -v`);
- para mobile, confirme emulador Android ativo e stack Appium configurada.

### k6 nao encontrado

- instale o k6 no sistema e valide com `k6 version`.

### Allure sem abrir relatorio

- execute:
  - `npm --prefix automation/Mobile run allure:generate`
  - `npm --prefix automation/Mobile run allure:open`

## Material textual do TCC

Arquivos prontos para composicao do documento final:

- `manual/tcc/resumo.md`
- `manual/tcc/introducao.md`
- `manual/tcc/conclusao.md`
- `manual/tcc/referencias-abnt.md`

## Autor

Lucas Viggiano Esteves
