# GitHub Actions - Execucao de Testes

Workflow principal: `.github/workflows/qa-pipeline.yml`

## 1) O que roda na pipeline hoje

Jobs ativos:

- `API Tests - Supertest/Jest`
- `UI Tests - Cypress`
- `Performance Tests - k6`

Observacao: atualmente o job mobile nao faz parte da pipeline principal.

## 2) Como disparar execucao completa

## Pela interface do GitHub

1. Acesse `Actions` no repositorio.
2. Selecione `QA Complete Pipeline`.
3. Clique em `Run workflow`.
4. Escolha a branch (normalmente `main`).
5. Defina `run_performance` conforme necessidade.
6. Execute.

## 3) Como rodar apenas o que for necessario

- API somente: execute local com `npm run test:api:all`.
- UI somente: execute local com `npm run test:ui`.
- Performance somente: execute local com `npm run test:performance`.

Se precisar separar por job no CI, a recomendacao e criar workflow dedicado por camada em vez de rerun parcial manual.

## 4) Como interpretar status e artefatos

## Status

- `success`: job aprovado.
- `failure`: houve falha em teste/comando.
- `cancelled`: execucao interrompida manualmente ou por concorrencia.

## Artefatos publicados

- `api-evidence`: logs e cobertura API
- `ui-evidence`: screenshots/videos/downloads do Cypress
- `performance-evidence`: logs e summaries do k6

## 5) Validacao minima apos run completa

1. Todos os jobs ativos com `success`.
2. Artefatos disponiveis para API/UI/performance.
3. Sem regressao funcional evidente nos logs finais.
