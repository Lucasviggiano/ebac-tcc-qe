# SQuaRE Scorecard - 2026-04-15

## Metadados

- modo: `gate`
- execucao: `2026-04-16T02:52:26.206Z`
- branch: `feat/consolidacao-raiz`
- commit: `27c97d9e`
- mobile esperado no gate: `nao`

## Resultado geral

- score ponderado: **51.67**
- threshold global: **80**
- gate final: **FAIL**

## Caracteristicas (ISO/IEC 25010)

| Caracteristica | Peso | Score | Threshold | Status |
|---|---:|---:|---:|---|
| Adequacao funcional | 30% | 65 | 85 | FAIL |
| Confiabilidade | 20% | 40 | 80 | FAIL |
| Eficiencia de desempenho | 20% | 22.5 | 70 | FAIL |
| Compatibilidade | 10% | 66.67 | 80 | FAIL |
| Usabilidade | 10% | 30 | 75 | FAIL |
| Manutenibilidade | 10% | 100 | 80 | PASS |

## Resumo de evidencias

- API log: `reports\evidence\runs\2026-04-15-full\logs\02-api-all.log`
- UI log: `reports\evidence\runs\2026-04-15-full\logs\01-ui.log`
- Mobile log: `reports\evidence\runs\2026-04-15-full\logs\03-mobile-smoke.log`
- Perf login summary: `reports\evidence\runs\2026-04-15-full\artifacts\login-summary.json`
- Perf catalog summary: `reports\evidence\runs\2026-04-15-full\artifacts\catalog-summary.json`
- Environment log: `reports\evidence\runs\2026-04-15-full\logs\00-environment.txt`
