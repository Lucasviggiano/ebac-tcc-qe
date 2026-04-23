# Matriz de rastreabilidade - Requisitos do PDF (4.1 a 4.7)

## 4.1 Estrategia de teste

- Estrategia detalhada: `planning/test-strategy/test-strategy.md`
- Mapa mental textual: `planning/test-strategy/test-mind-map.md`
- Mapa mental em imagem: `planning/test-strategy/assets/test-mind-map.svg`
- Riscos e prioridades: `planning/test-strategy/risks-and-priorities.md`

## 4.2 Criterios de aceitacao (Gherkin)

- US001: `planning/acceptance-criteria/AC-US001-add-to-cart.md`
- US002: `planning/acceptance-criteria/AC-US002-login.md`
- US003: `planning/acceptance-criteria/AC-US003-coupons-api.md`
- Catalogo: `planning/acceptance-criteria/AC-US004-product-catalog.md`
- Minha Conta: `planning/acceptance-criteria/AC-US005-my-account-dashboard.md`
- Meus Pedidos: `planning/acceptance-criteria/AC-US006-my-orders.md`
- Enderecos: `planning/acceptance-criteria/AC-US007-addresses.md`
- Detalhes da conta: `planning/acceptance-criteria/AC-US008-account-details.md`

## 4.3 Casos de teste

- US001: `planning/test-cases/TC-US001-add-to-cart.md`
- US002: `planning/test-cases/TC-US002-login.md`
- US003: `planning/test-cases/TC-US003-coupons-api.md`
- Mobile catalogo: `planning/test-cases/TC-mobile-catalog.md`
- US004-US008: `planning/test-cases/TC-US004-product-catalog.md` ate `planning/test-cases/TC-US008-account-details.md`

## 4.5.1 Automacao UI

- Arquitetura e padroes: `docs/automation-architecture.md`, `docs/used-patterns.md`
- Comparativo de ferramenta: `docs/ui-tool-comparison.md`
- Testes UI: `automation/UI/cypress/e2e/login.cy.js`, `automation/UI/cypress/e2e/add-to-cart.cy.js`, `automation/UI/cypress/e2e/e2e-purchase-flow.cy.js`
- Page Object e Actions: `automation/UI/cypress/support/pages`, `automation/UI/cypress/support/actions`

## 4.5.2 Automacao API

- Cliente e configuracao: `automation/API/src/clients/couponsClient.js`, `automation/API/src/config`
- Schemas e contratos: `automation/API/src/schemas`, `automation/API/tests/contracts/coupons-contract.spec.js`
- Cenarios de cupons: `automation/API/tests/coupons`

## 4.5.3 Automacao Mobile (Android)

- Config e scripts: `automation/Mobile/wdio.conf.js`, `automation/Mobile/configs/android.conf.js`, `automation/Mobile/package.json`
- Screen Object Pattern: `automation/Mobile/screens`, `automation/Mobile/selectors/android`
- Suite catalogo Android: `automation/Mobile/tests/catalog`

## 4.6 Integracao continua

- Workflow oficial: `.github/workflows/qa-pipeline.yml`
- Referencia legada: `ci-cd/github-actions/qa-pipeline.yml`

## 4.7 Performance (k6)

- Cenarios k6: `performance/k6/login-performance.js`, `performance/k6/catalog-performance.js`
- Massa exigida: `performance/k6/data/users.json`
- Guia de execucao: `performance/k6/README.md`

## Secoes textuais do TCC

- Resumo: `manual/tcc/resumo.md`
- Introducao: `manual/tcc/introducao.md`
- Conclusao: `manual/tcc/conclusao.md`
- Referencias (ABNT basica): `manual/tcc/referencias-abnt.md`
