# Evidence Index - 2026-04-15

## 1. Pasta oficial da rodada

- `reports/evidence/runs/2026-04-15-full/`

## 2. Inventario de arquivos

### 2.1 Identificacao de ambiente

- `reports/evidence/runs/2026-04-15-full/logs/00-environment.txt`

### 2.2 Logs de execucao

- `reports/evidence/runs/2026-04-15-full/logs/01-ui.log`
- `reports/evidence/runs/2026-04-15-full/logs/02-api-all.log`
- `reports/evidence/runs/2026-04-15-full/logs/03-mobile-smoke.log`
- `reports/evidence/runs/2026-04-15-full/logs/04-performance.log`
- `reports/evidence/runs/2026-04-15-full/logs/05-performance-catalog-only.log`

### 2.3 Artefatos estruturados

- `reports/evidence/runs/2026-04-15-full/artifacts/login-summary.json`
- `reports/evidence/runs/2026-04-15-full/artifacts/catalog-summary.json`

### 2.4 Sumario bruto da execucao

- `reports/evidence/runs/2026-04-15-full/EXECUTION_SUMMARY.md`

## 3. Evidencia por requisito de banca

- API (US003): log `02-api-all.log` + contratos e casos aprovados.
- UI: log `01-ui.log` com falha `EPERM` registrada.
- Mobile Android: log `03-mobile-smoke.log` com falha `EPERM` registrada.
- Performance k6: logs `04` e `05` + summaries JSON.

## 4. Sequencia recomendada de apresentacao

1. `00-environment.txt`
2. `02-api-all.log` (bloco final de aprovacao)
3. `01-ui.log` (erro EPERM)
4. `03-mobile-smoke.log` (erro EPERM)
5. `04-performance.log` (thresholds + proxy)
6. `05-performance-catalog-only.log` (thresholds + proxy)
7. `artifacts/login-summary.json`
8. `artifacts/catalog-summary.json`
