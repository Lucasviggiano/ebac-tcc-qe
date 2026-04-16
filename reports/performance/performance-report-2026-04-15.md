# Performance Report - 2026-04-15

## 1. Escopo

Execucao k6 dos 2 cenarios oficiais:

- login (`login-performance.js`)
- catalogo (`catalog-performance.js`)

Configuracao da rodada (enunciado):

- `20` usuarios virtuais
- `2` minutos totais
- `20s` ramp-up
- massa: `user1_ebac` a `user5_ebac` com senha `psw!ebac@test`

## 2. Comandos executados

```bash
npm run test:performance
npm run test:performance:catalog
```

## 3. Resultado por cenario

### 3.1 Login

- status: **FAIL**
- codigo de saida: `99`
- thresholds violados:
  - `checks rate>0.90` -> `50.00%`
  - `http_req_failed rate<0.10` -> `100.00%`
- iteracoes: `1689`
- erro predominante: `proxyconnect tcp ... 127.0.0.1:9`

Fontes:

- `reports/evidence/runs/2026-04-15-full/logs/04-performance.log`
- `reports/evidence/runs/2026-04-15-full/artifacts/login-summary.json`

### 3.2 Catalogo

- status: **FAIL**
- codigo de saida: `99`
- thresholds violados:
  - `checks rate>0.90` -> `25.00%`
  - `http_req_failed rate<0.10` -> `100.00%`
- iteracoes: `331`
- erro predominante: `proxyconnect tcp ... 127.0.0.1:9`

Fontes:

- `reports/evidence/runs/2026-04-15-full/logs/05-performance-catalog-only.log`
- `reports/evidence/runs/2026-04-15-full/artifacts/catalog-summary.json`

## 4. Analise de impacto

- nao houve trafego valido para o alvo remoto nesta rodada;
- falha de conectividade/proxy inviabilizou medicao real de desempenho do sistema.

## 5. Acao recomendada

- corrigir configuracao de proxy/rede do host/agente;
- reexecutar os dois cenarios para obter leitura real de latencia e taxa de erro.
