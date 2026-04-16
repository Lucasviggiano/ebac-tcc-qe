# Testing patterns usados no projeto

## 1. Page Object (UI)

- Local: `automation/UI/cypress/support/pages`
- Beneficio: isolamento de seletores e acoes de pagina

## 2. App Actions (UI)

- Local: `automation/UI/cypress/support/actions`
- Beneficio: composicao de fluxos de negocio reutilizaveis (ex: login e carrinho)

## 3. API Client + Contract Validation (API)

- Local: `automation/API/src/clients` e `automation/API/src/schemas`
- Beneficio: padronizacao de chamadas HTTP e garantia de contrato por schema

## 4. Screen Object Pattern (Mobile)

- Local: `automation/Mobile/screens` e `automation/Mobile/selectors/android`
- Beneficio: reuso de interacoes e manutencao simplificada
