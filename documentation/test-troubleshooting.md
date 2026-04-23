# Troubleshooting de Testes

Guia rapido para falhas comuns por camada.

## API (Jest + Supertest)

## Sintoma

- Respostas 5xx ou instabilidade no endpoint.

## Causas provaveis

- Ambiente remoto indisponivel/intermitente.
- Credenciais/variaveis incorretas.

## Acoes

```bash
npm run test:api
npm run test:api:contracts
```

- Verifique `automation/API/.env` (se aplicavel).
- Consulte logs em `reports/ci/api/`.

## UI (Cypress)

## Sintoma

- Timeout de elemento.
- Falha intermitente em fluxo.

## Causas provaveis

- Seletor desatualizado.
- Dados de teste inconsistentes.

## Acoes

```bash
npm run test:ui
npm run test:ui:open
```

- Verifique evidencias em:
  - `automation/UI/cypress/screenshots/`
  - `automation/UI/cypress/videos/`

## Mobile (Appium + WDIO)

## Sintoma

- `wdio: not found`
- Falha de conexao com Appium/emulador.
- Timeout de inicializacao Android.

## Causas provaveis

- Dependencias mobile nao instaladas.
- Emulador Android nao iniciado.
- Stack Java/Android SDK/Appium mal configurada.

## Acoes

```bash
npm --prefix automation/Mobile ci
npm run test:mobile:smoke
npm --prefix automation/Mobile run allure:generate
```

- Verifique `reports/ci/mobile/` e `automation/Mobile/reports/allure-results/`.

## Performance (k6)

## Sintoma

- `k6: command not found`
- Thresholds excedidos.

## Causas provaveis

- k6 nao instalado no sistema.
- Ambiente sob carga/latencia alta.

## Acoes

```bash
k6 version
npm run test:performance
```

- Analise resultados em `performance/k6/reports/` e `reports/ci/performance/`.

## Problemas gerais

## Dependencias quebradas

```bash
npm ci
npm --prefix automation/UI ci
npm --prefix automation/API ci
npm --prefix automation/Mobile ci
```

## Validar runtime

```bash
node -v
npm -v
```
