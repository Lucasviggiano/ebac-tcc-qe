# Performance - TCC-EBAC-QE

Guia da camada de performance baseada em k6, aderente ao enunciado do TCC.

## Objetivo

Validar estabilidade de resposta e taxa de falha dos fluxos criticos sob carga controlada.

Cenarios oficiais:

- Login (`POST /minha-conta/`)
- Catalogo (`GET /produtos/`)

## Parametros oficiais do TCC

Aplicados nos dois cenarios:

- 20 usuarios virtuais
- 2 minutos de execucao total
- ramp-up de 20 segundos
- sustentacao de 1m40 com 20 VUs

Massa oficial:

- `user1_ebac` a `user5_ebac`
- senha `psw!ebac@test`

## Estrutura

```text
performance/
|-- k6/
|   |-- login-performance.js
|   |-- catalog-performance.js
|   |-- data/users.json
|   `-- reports/
`-- README.md
```

## Execucao

Pela raiz:

```bash
npm run test:performance
```

Execucao individual:

```bash
npm run test:performance:login
npm run test:performance:catalog
```

## Evidencias geradas

Os scripts geram automaticamente:

- `performance/k6/reports/login-summary.json`
- `performance/k6/reports/catalog-summary.json`

## CI/CD

No workflow oficial `.github/workflows/qa-pipeline.yml`:

- job `performance-tests`
- upload do artefato `performance-evidence` (summaries + logs)
- consumo dos summaries pelo job `square-gate` para calculo de score SQuaRE

## Referencias

- `performance/k6/README.md`
- `docs/execution-playbook.md`
- `reports/README.md`
