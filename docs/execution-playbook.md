# Execution Playbook - TCC-EBAC-QE

Guia operacional para execucao local e em pipeline, com foco em reproducibilidade, rastreabilidade e velocidade de diagnostico.

## 1. Objetivo

Padronizar a rotina de execucao de testes nas 4 camadas do projeto:

- UI
- API
- Mobile
- Performance

## 2. Pre-check de ambiente

Na raiz do repositorio:

```bash
node -v
npm -v
k6 version
```

Para mobile (quando aplicavel):

```bash
adb devices
```

## 3. Setup completo

### 3.1 Dependencias

```bash
npm ci
npm --prefix automation/UI ci
npm --prefix automation/API ci
npm --prefix automation/Mobile ci
```

### 3.2 Variaveis da API

```bash
cp automation/API/.env.example automation/API/.env
```

No PowerShell:

```powershell
Copy-Item automation/API/.env.example automation/API/.env
```

## 4. Ordem recomendada de execucao

1. API (baseline funcional + contratos)
2. UI (fluxos de negocio)
3. Performance (k6)
4. Mobile (Android, quando no escopo da rodada)

## 5. Execucao por camada

### 5.1 API

```bash
npm run test:api
npm run test:api:contracts
```

Saida esperada:

- suites passando, ou `ENV-SKIP` explicito para indisponibilidade 5xx de ambiente.

### 5.2 UI

```bash
npm run test:ui
```

Debug local:

```bash
npm run test:ui:open
```

### 5.3 Performance (k6)

```bash
npm run test:performance
```

Este comando gera:

- `performance/k6/reports/login-summary.json`
- `performance/k6/reports/catalog-summary.json`

### 5.4 Mobile Android

```bash
npm run test:mobile:smoke
npm run test:mobile:catalog
```

Relatorio:

```bash
npm --prefix automation/Mobile run allure:generate
npm --prefix automation/Mobile run allure:open
```

## 6. Criterios de aprovacao da rodada

1. API executa com asserts funcionais/contrato quando endpoint esta saudavel.
2. UI executa os cenarios alvo da release.
3. Performance executa os 2 cenarios com configuracao oficial.
4. Mobile executa quando fizer parte do escopo da entrega.
5. Evidencias e resumo atualizados em `reports/`.

## 7. CI/CD

Workflow oficial:

- `.github/workflows/qa-pipeline.yml`

Jobs:

- API
- UI
- Performance
- Mobile smoke (manual via `workflow_dispatch` com `run_mobile=true`)

Inputs manuais recomendados para rodada completa de banca:

- `run_performance=true`
- `run_mobile=true`

## 8. Troubleshooting rapido

### 8.1 API instavel (5xx)

- validar `BASE_URL` e conectividade do endpoint;
- manter log de `ENV-SKIP` como evidencia de ambiente.

### 8.2 Cypress/Appium com erro de permissao local

- revisar permissao de execucao no host;
- reexecutar `npm ci` na camada;
- rodar em terminal com privilegio adequado quando necessario.

### 8.3 Proxy quebrando k6

PowerShell:

```powershell
$env:HTTP_PROXY=""
$env:HTTPS_PROXY=""
$env:ALL_PROXY=""
$env:NO_PROXY="localhost,127.0.0.1,::1,lojaebac.ebaconline.art.br"
npm run test:performance
```

## 9. Referencias

- `README.md`
- `docs/pdf-requirements-traceability.md`
- `automation/UI/README.md`
- `automation/API/README.md`
- `automation/Mobile/README.md`
- `performance/README.md`
- `reports/README.md`
