# SQuaRE - Catalogo de Metricas (ISO/IEC 25023)

Catalogo de metricas operacionais utilizadas pelo avaliador SQuaRE.

## Regras gerais

- Unidade de score por caracteristica: `0-100`
- Frequencia: por execucao de pipeline/rodada de testes
- Fonte unica de consolidacao: `reports/square/scorecard-YYYY-MM-DD.json`

## Metricas por caracteristica

| Caracteristica | Metricas | Formula | Limiar |
|---|---|---|---|
| Adequacao funcional | `apiQualityScore`, `uiStatusScore`, `mobileStatusScore` (quando exigido), `assertionIndicatorScore` | Sem mobile: `0.50*api + 0.35*ui + 0.15*assertions`; Com mobile: `0.40*api + 0.25*ui + 0.25*mobile + 0.10*assertions` | >= 85 |
| Confiabilidade | `apiStatusScore`, `uiStatusScore`, `mobileStatusScore` (quando exigido), `avgPerformanceFailureRate`, `envSkipPenalty` | Score base ponderado - penalidade `ENV-SKIP` (max 20 pontos) | >= 80 |
| Eficiencia de desempenho | `loginScenarioScore`, `catalogScenarioScore` | Cenario: `0.60*(checks%) + 0.40*(1-http_req_failed%)`; Caracteristica: media dos cenarios | >= 70 |
| Compatibilidade | `requiredPlatforms`, `passedPlatforms` | `(passedPlatforms / requiredPlatforms) * 100` | >= 80 |
| Usabilidade | `uiStatusScore`, `mobileStatusScore` (quando exigido), `assertionIndicatorScore` | Sem mobile: `0.70*ui + 0.30*assertions`; Com mobile: `0.50*ui + 0.20*mobile + 0.30*assertions` | >= 75 |
| Manutenibilidade | `maintainabilityChecklistPassed`, `maintainabilityChecklistTotal` | `(itens_ok / itens_totais) * 100` | >= 80 |

## Metricas globais

- Score ponderado global:
  - `0.30*Funcional + 0.20*Confiabilidade + 0.20*Eficiencia + 0.10*Compatibilidade + 0.10*Usabilidade + 0.10*Manutenibilidade`
- Gate global:
  - score global `>= 80`
  - todas as caracteristicas acima do respectivo threshold

## Fontes tecnicas de coleta

- API: `api-tests.log` ou `02-api-all.log`
- UI: status de job + log quando disponivel
- Mobile: status de job + log quando disponivel
- Performance: `login-summary.json` e `catalog-summary.json` do k6
- Assertions de feedback: arquivos de teste UI e helper de assercao textual
- Manutenibilidade: checklist de estrutura/padroes e documentos obrigatorios
