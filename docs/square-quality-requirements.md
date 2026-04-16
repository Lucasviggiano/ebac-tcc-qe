# SQuaRE - Requisitos de Qualidade (ISO/IEC 25010)

Este documento define os requisitos formais de qualidade do TCC-EBAC-QE no formato `SQR-xxx`.

## Escopo de avaliacao

- Adequacao funcional
- Confiabilidade
- Eficiencia de desempenho
- Compatibilidade
- Usabilidade
- Manutenibilidade

## Pesos e thresholds oficiais

- Adequacao funcional: peso `30%`, gate `>=85`
- Confiabilidade: peso `20%`, gate `>=80`
- Eficiencia de desempenho: peso `20%`, gate `>=70`
- Compatibilidade: peso `10%`, gate `>=80`
- Usabilidade: peso `10%`, gate `>=75`
- Manutenibilidade: peso `10%`, gate `>=80`
- Score global ponderado: gate `>=80`

## Catalogo de requisitos SQR

| ID | Caracteristica | Subcaracteristica | Requisito | Alvo |
|---|---|---|---|---|
| SQR-001 | Adequacao funcional | Completude funcional | Fluxos criticos (US001-US003) devem ter cobertura automatizada ativa | >= 85 |
| SQR-002 | Adequacao funcional | Corretude funcional | Suites API devem manter aprovacao dos cenarios principais e contratos | >= 85 |
| SQR-003 | Confiabilidade | Maturidade | Falhas de ambiente devem ser registradas via `ENV-SKIP` sem mascarar falha funcional | 100% dos casos de instabilidade registrados |
| SQR-004 | Confiabilidade | Disponibilidade | Jobs criticos (API/UI/Performance e Mobile quando exigido) devem concluir com telemetria | >= 80 |
| SQR-005 | Eficiencia de desempenho | Comportamento temporal | Cenarios k6 devem executar com configuracao oficial do enunciado | 100% aderente |
| SQR-006 | Eficiencia de desempenho | Uso de recursos | Score consolidado de performance deve atender threshold da caracteristica | >= 70 |
| SQR-007 | Compatibilidade | Coexistencia | Rodada deve cobrir plataformas previstas para o tipo de execucao (push/PR ou manual) | >= 80 |
| SQR-008 | Compatibilidade | Interoperabilidade | Integracao entre suites e pipeline deve publicar evidencias consumiveis no gate | 100% dos artefatos previstos |
| SQR-009 | Usabilidade | Operabilidade | Testes UI devem validar feedback final de erro/sucesso com assercao textual resiliente | >= 75 |
| SQR-010 | Usabilidade | Reconhecimento de adequacao | Relatorios devem ser claros para banca (status, causa e evidencias) | 100% dos reports obrigatorios |
| SQR-011 | Manutenibilidade | Modificabilidade | Projeto deve manter padroes de automacao (Page Object, Actions, Screen Object, contratos) | >= 80 |
| SQR-012 | Manutenibilidade | Testabilidade | Processo SQuaRE deve ser reproduzivel por comando unico e com scorecard versionavel | 100% operacional |

## Evidencias de conformidade

- Scorecard JSON/Markdown em `reports/square/`
- Logs e artefatos em `reports/evidence/` e `reports/ci/`
- Matriz de rastreabilidade em `docs/square-traceability.md`
