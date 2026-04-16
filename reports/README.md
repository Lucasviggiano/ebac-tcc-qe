# Reports - TCC-EBAC-QE

Diretorio oficial de relatorios e evidencias das rodadas de teste.

## Objetivo

Centralizar resultados para rastreabilidade tecnica e auditoria de qualidade.

## Estrutura recomendada

```text
reports/
|-- summary-YYYY-MM-DD.md
|-- api/
|-- ui/
|-- mobile/
|-- performance/
|-- square/
|-- evidence/
|-- html/
|-- json/
`-- mocha/
```

## Convencao de nomenclatura

Use sempre data no formato `YYYY-MM-DD`.

- consolidado: `summary-YYYY-MM-DD.md`
- por camada: `<camada>-report-YYYY-MM-DD.md`
- inventario de evidencias: `evidence-index-YYYY-MM-DD.md`
- scorecard SQuaRE: `square/scorecard-YYYY-MM-DD.{json,md}`

## Conteudo minimo por report

1. data da rodada
2. suites/cenarios executados
3. total executado, pass, fail e skip
4. principais falhas e impacto
5. caminhos para evidencias
6. recomendacao (go/no-go), quando aplicavel

## Fluxo operacional apos cada rodada

1. atualizar report da camada executada;
2. atualizar consolidado do dia;
3. atualizar inventario de evidencias;
4. validar caminhos dos artefatos.

## Artefatos comuns

- UI: videos e screenshots do Cypress
- API: logs e cobertura
- Mobile: Allure report/results
- Performance: summaries JSON do k6
- SQuaRE: scorecard consolidado de qualidade

## Referencias

- `docs/execution-playbook.md`
- `docs/pdf-requirements-traceability.md`
- `.github/workflows/qa-pipeline.yml`
