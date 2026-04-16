# TC-US003 - API de cupons

| ID | Caso de teste | Tipo | Tecnica | Resultado esperado | Automatizar |
|---|---|---|---|---|---|
| CT-US003-01 | Listar cupons com autenticacao valida | Feliz | Particao de equivalencia | Status de sucesso e lista de cupons | Sim (API) |
| CT-US003-02 | Buscar cupom por ID existente | Feliz | Particao de equivalencia | Status de sucesso e cupom correto | Sim (API) |
| CT-US003-03 | Criar cupom com payload valido (amount 10.00, fixed_product, descricao Cupom de teste) | Feliz | Particao de equivalencia | Cupom criado com status de criacao e campos aderentes ao PDF | Sim (API) |
| CT-US003-04 | Criar cupom duplicado | Negativo | Particao de equivalencia | API rejeita duplicidade | Sim (API) |
| CT-US003-05 | Criar cupom sem campo obrigatorio | Negativo | Particao de equivalencia | API retorna erro de validacao | Sim (API) |
| CT-US003-06 | Acessar endpoint sem autenticacao valida | Negativo | Particao de equivalencia | API nega acesso para credencial diferente de admin_ebac/@admin!&b@c!2022 | Sim (API) |
| CT-US003-07 | Listar cupons com paginacao (per_page=1) | Alternativo | Particao de equivalencia | API retorna status de sucesso e no maximo 1 registro | Sim (API) |
