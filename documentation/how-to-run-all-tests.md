# Como Rodar Todos os Testes

Este guia descreve setup, comandos e ordem recomendada para executar UI, API, Mobile e Performance.

## 1) Pre-requisitos

## Gerais

- Node.js 20+
- npm 10+

## UI (Cypress)

- Dependencias NPM da camada `automation/UI`

## API (Jest + Supertest)

- Dependencias NPM da camada `automation/API`
- Opcional: arquivo `.env` baseado em `automation/API/.env.example`

## Mobile (WebdriverIO + Appium)

- Java/JDK instalado
- Android SDK + emulador Android configurado
- Dependencias NPM da camada `automation/Mobile`

## Performance (k6)

- `k6` instalado e acessivel no PATH (`k6 version`)

## 2) Setup de ambiente

## Setup unico (recomendado)

```bash
npm ci
npm --prefix automation/UI ci
npm --prefix automation/API ci
npm --prefix automation/Mobile ci
```

## Setup de API com .env (opcional)

```bash
cp automation/API/.env.example automation/API/.env
```

```powershell
Copy-Item automation/API/.env.example automation/API/.env
```

## 3) Execucao rapida (smoke)

```bash
npm run test:ui
npm run test:api
npm run test:mobile:smoke
npm run test:performance
```

Observacao: `test:all` no root executa a mesma sequencia:

```bash
npm run test:all
```

## 4) Execucao completa por camada

## UI

```bash
npm run test:ui
```

Modo interativo:

```bash
npm run test:ui:open
```

## API

Suite completa:

```bash
npm run test:api:all
```

Suite principal (cupons + contratos):

```bash
npm run test:api
```

Contratos:

```bash
npm run test:api:contracts
```

## Mobile

Suite default:

```bash
npm run test:mobile
```

Android:

```bash
npm run test:mobile:android
```

Smoke:

```bash
npm run test:mobile:smoke
```

Catalogo:

```bash
npm run test:mobile:catalog
```

Relatorio Allure:

```bash
npm --prefix automation/Mobile run allure:generate
npm --prefix automation/Mobile run allure:open
```

## Performance

Login:

```bash
npm run test:performance:login
```

Catalogo:

```bash
npm run test:performance:catalog
```

Completo:

```bash
npm run test:performance
```

## 5) Ordem recomendada para execucao local

1. API (`npm run test:api`)
2. UI (`npm run test:ui`)
3. Mobile (`npm run test:mobile:smoke`)
4. Performance (`npm run test:performance`)

Motivo: API/UI validam funcional antes do custo de mobile/performance.

## 6) Evidencias e logs por camada

- API: `reports/ci/api/`
- UI: `automation/UI/cypress/screenshots/`, `automation/UI/cypress/videos/`
- Mobile: `reports/ci/mobile/`, `automation/Mobile/reports/allure-results/`, `automation/Mobile/reports/allure-report/`
- Performance: `reports/ci/performance/`, `performance/k6/reports/`
