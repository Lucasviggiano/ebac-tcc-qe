# Status de Cobertura - Planning

Matriz resumida entre planejamento e automacao atual.

## Resumo

- US001 (UI): coberto
- US002 (UI): coberto
- US003 (API cupons): coberto
- US004 (UI registro/catalogo): coberto
- Mobile catalogo Android: coberto no escopo definido

## Detalhamento

| Area | Planejado | Estado atual |
|---|---|---|
| US001 - carrinho | Limite por item, regras de cupom e bloqueio por valor | Casos planejados e automacao UI principal implementada |
| US002 - login | Valido, invalido e regra de tentativas | Casos planejados e automacao UI implementada |
| US003 - API cupons | GET lista, GET por ID, POST valido, duplicidade, obrigatorios e contrato | Suite API aderente ao PDF com contrato e politica de `ENV-SKIP` para 5xx |
| US004 - registro/catalogo | Registro de usuario e navegacao de catalogo | Casos planejados e automacao UI implementada |
| Mobile catalogo | Smoke, listagem e detalhe | Suite Android implementada para catalogo com relatorio Allure |

## Observacoes

- O status considera o repositorio na versao atual e os scripts oficiais da raiz.
- Evidencias operacionais devem ser registradas em `reports/`.
