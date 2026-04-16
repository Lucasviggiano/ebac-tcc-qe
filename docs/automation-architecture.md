# Arquitetura de automacao

## Visao geral

O projeto foi organizado por camada de plataforma para reduzir acoplamento e facilitar manutencao:

- `automation/UI`: testes web com Cypress
- `automation/API`: testes de API com Supertest + Jest
- `automation/Mobile`: testes Android com Appium + WebdriverIO
- `performance/k6`: testes de performance

## Padroes aplicados

- UI: Page Object + App Actions
- API: API Client + Service Layer + Contract Validation (AJV)
- Mobile: Screen Object Pattern

## Rastreabilidade

Cada historia possui:

1. criterio de aceitacao em `planning/acceptance-criteria`
2. casos de teste em `planning/test-cases`
3. automacao correspondente em `automation/*`

## Evidencias

- UI: screenshots/videos do Cypress
- API: logs de execucao e relatorio de cobertura
- Mobile: Allure results e report
- k6: summary em JSON
