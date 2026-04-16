# SQuaRE - Matriz de Rastreabilidade

Matriz de ligacao entre requisito de qualidade, ativos de teste e evidencia objetiva.

## Matriz SQR -> Artefatos

| SQR | Criterio/Regra | Casos/Testes | Evidencia |
|---|---|---|---|
| SQR-001 | Cobertura de fluxos criticos | `planning/test-cases/TC-US001*`, `TC-US002*`, `TC-US003*` | `reports/summary-*.md` |
| SQR-002 | Corretude funcional API | `automation/API/tests/coupons`, `automation/API/tests/contracts` | `api-tests.log`, scorecard |
| SQR-003 | Registro de instabilidade | Politica `ENV-SKIP` em testes API | `02-api-all.log` / `reports/ci/api` |
| SQR-004 | Conclusao dos jobs criticos | Jobs `api-tests`, `ui-tests`, `performance-tests` (+mobile quando exigido) | GitHub Actions + scorecard |
| SQR-005 | Configuracao oficial de performance | `performance/k6/login-performance.js`, `catalog-performance.js` | summaries k6 + logs |
| SQR-006 | Threshold de desempenho | avaliacao de `checks` e `http_req_failed` | `scorecard-*.json` |
| SQR-007 | Cobertura de plataformas da rodada | UI/API/Performance e Mobile condicional | `executionStatus` no scorecard |
| SQR-008 | Publicacao de evidencias | upload de artefatos no workflow | artefatos `*-evidence` |
| SQR-009 | Assercao de mensagem final UI | helper `assertTextContainsAny` + specs UI | specs + scorecard (assertion indicator) |
| SQR-010 | Clareza para banca | relatorios consolidados por camada e indice | `reports/*-report-*.md` |
| SQR-011 | Padroes de automacao ativos | Page Object, Actions, contratos, Screen Object | checklist de manutenibilidade |
| SQR-012 | Avaliacao reproduzivel | `npm run square:evaluate` / `npm run square:gate` | `reports/square/*` |

## Ligacao com requisitos 4.1 a 4.7

- Os artefatos originais do TCC continuam em `docs/pdf-requirements-traceability.md`.
- SQuaRE opera como camada de governanca adicional sobre os mesmos ativos de planejamento, automacao e evidencia.
