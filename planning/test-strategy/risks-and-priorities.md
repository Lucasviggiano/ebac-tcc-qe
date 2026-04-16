# Riscos e prioridades - EBAC Shop

## Criticos (prioridade alta)

1. Login na plataforma (US-0002)
2. Carrinho e limite de compra (US-0001)
3. API de cupons (US-0003)

Motivadores:

- impacto direto na conversao
- potencial de perda financeira
- alto risco de regressao

## Importantes (prioridade media)

1. Catalogo de produtos (web e mobile)
2. Painel Minha Conta
3. Meus Pedidos
4. Enderecos
5. Detalhes da Conta

## Menor impacto (prioridade baixa)

- ajustes visuais sem quebra funcional
- fluxos raros e nao criticos para compra

## Matriz de risco

| Risco | Probabilidade | Impacto | Nivel | Mitigacao |
|---|---|---|---|---|
| ambiente instavel | media | alto | alto | repeticao controlada e evidencia |
| massa de dados inconsistente | alta | alto | alto | fixtures versionadas e dados fixos |
| regressao em fluxo critico | media | alto | alto | regressao automatizada em CI |
| contrato de API quebrado | media | alto | alto | validacao por schema em suite API |
| seletor UI instavel | alta | medio | medio | Page Object + App Actions |
| dependencia de dispositivo mobile | media | medio | medio | smoke no CI e full local |

## Regra de prioridade para automacao

- primeiro: cenarios felizes e alternativos dos fluxos criticos
- segundo: cenarios negativos com maior risco de negocio
- terceiro: cobertura complementar
