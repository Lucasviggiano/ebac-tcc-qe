# Automacao Mobile - Android

Camada mobile do TCC-EBAC-QE com foco na funcionalidade de Catalogo de Produtos.

## Stack

- Appium
- WebdriverIO
- Mocha
- Allure Reporter

## Padrao aplicado

- Screen Object Pattern em `screens/`
- Mapeamento de localizadores em `selectors/android/`
- Utilitarios de espera e gesto em `utils/`

## Execucao

```bash
npm ci
npm run test:android
```

## Relatorios

```bash
npm run allure:generate
npm run allure:open
```

Diretorios de saida:

- `reports/allure-results`
- `reports/allure-report`
