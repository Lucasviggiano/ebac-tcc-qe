# SQuaRE - Metodo de Avaliacao (ISO/IEC 25040)

Este documento define o processo de avaliacao de qualidade usado no projeto.

## 1. Objetivo da avaliacao

Avaliar, de forma objetiva e repetivel, a conformidade do projeto com os requisitos SQuaRE definidos para a banca.

## 2. Entradas obrigatorias

- Requisitos de qualidade: `docs/square-quality-requirements.md`
- Catalogo de metricas: `docs/square-metrics-catalog.md`
- Evidencias de execucao (logs/artifacts): `reports/evidence/` ou `reports/ci/`
- Status dos jobs no pipeline (API/UI/Performance e Mobile quando aplicavel)

## 3. Processo de avaliacao

1. Coletar evidencias da rodada.
2. Extrair metricas tecnicas por caracteristica.
3. Calcular score por caracteristica.
4. Calcular score global ponderado.
5. Aplicar regras de gate.
6. Gerar scorecard JSON e Markdown.
7. Publicar resultado no CI como artefato.

## 4. Regras de execucao por contexto

- `push/pull_request`:
  - Mobile pode ser `N/A` quando nao fizer parte da rodada automatica.
  - Gate permanece ativo com plataformas obrigatorias do contexto.
- `workflow_dispatch` com `run_mobile=true`:
  - Mobile passa a ser obrigatorio para o gate.

## 5. Criterios de julgamento

- Aprovado (GO):
  - score global `>= 80`
  - todas as caracteristicas com score acima do threshold definido
- Reprovado (NO-GO):
  - score global `< 80` ou qualquer caracteristica abaixo do threshold

## 6. Saidas da avaliacao

- `reports/square/scorecard-YYYY-MM-DD.json`
- `reports/square/scorecard-YYYY-MM-DD.md`
- Codigo de saida:
  - `0` para avaliacao aprovada
  - nao-zero para gate reprovado (quando executado em modo gate)

## 7. Responsabilidades

- QA Engineer:
  - manter requisitos, metricas e rastreabilidade SQuaRE
  - analisar scorecards e recomendar GO/NO-GO
- Time tecnico:
  - corrigir falhas evidenciadas no scorecard
  - preservar padroes de automacao e evidencias
