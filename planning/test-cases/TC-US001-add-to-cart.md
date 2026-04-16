# TC-US001 - Adicionar item ao carrinho

| ID | Caso de teste | Tipo | Tecnica | Resultado esperado | Automatizar |
|---|---|---|---|---|---|
| CT-US001-01 | Adicionar item com quantidade valida (1 ate 10) | Feliz | Particao de equivalencia | Item adicionado com sucesso ao carrinho | Sim (UI) |
| CT-US001-02 | Tentar adicionar 11 unidades do mesmo produto | Negativo | Valor limite | Sistema bloqueia quantidade acima do limite | Sim (UI) |
| CT-US001-03 | Total entre 200 e 600 deve habilitar cupom de 10% | Alternativo | Tabela de decisao | Cupom de 10% disponivel/aplicado | Sim (UI) |
| CT-US001-04 | Total acima de 600 deve habilitar cupom de 15% | Alternativo | Tabela de decisao | Cupom de 15% disponivel/aplicado | Nao |
| CT-US001-05 | Total acima de 990 deve bloquear continuidade | Negativo | Valor limite | Checkout bloqueado com mensagem de limite | Sim (UI) |
