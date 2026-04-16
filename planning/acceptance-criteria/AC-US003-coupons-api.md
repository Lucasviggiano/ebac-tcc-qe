# AC-US003 - API de cupons

## Historia de usuario

Como administrador da EBAC Shop  
Quero gerenciar cupons via API  
Para manter regras promocionais corretas

## Regras de negocio

- autenticacao Basic obrigatoria
- usuario autorizado: `admin_ebac`
- senha autorizada: `@admin!&b@c!2022`
- header equivalente: `Authorization: Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy`
- listar cupons
- consultar cupom por ID
- cadastrar cupom
- impedir cupom duplicado
- obrigatorios no cadastro: `code`, `amount`, `discount_type`, `description`
- payload base de referencia: `amount: "10.00"`, `discount_type: "fixed_product"`, `description: "Cupom de teste"`

## Criterios em Gherkin

```gherkin
Funcionalidade: Gestao de cupons por API

Cenario: Listar cupons com autenticacao valida
  Dado que o usuario esta autenticado com credenciais validas
  Quando chamar o endpoint de listagem de cupons
  Entao a API deve retornar status de sucesso
  E uma lista de cupons

Cenario: Buscar cupom por ID existente
  Dado que o usuario esta autenticado com credenciais validas
  E existe um cupom com ID conhecido
  Quando chamar o endpoint por ID
  Entao a API deve retornar status de sucesso
  E os dados do cupom solicitado

Cenario: Cadastrar cupom com payload valido
  Dado que o usuario esta autenticado com credenciais validas
  Quando enviar um payload com code, amount, discount_type e description
  Entao a API deve criar o cupom
  E retornar status de criacao

Cenario: Impedir cadastro de cupom duplicado
  Dado que o usuario esta autenticado com credenciais validas
  E existe um cupom com determinado code
  Quando enviar novo cadastro com o mesmo code
  Entao a API deve rejeitar a requisicao
  E retornar mensagem de duplicidade

Cenario: Impedir cadastro com campos obrigatorios ausentes
  Dado que o usuario esta autenticado com credenciais validas
  Quando enviar payload sem um campo obrigatorio
  Entao a API deve rejeitar a requisicao
  E retornar mensagem de validacao

Cenario: Listar cupons com paginacao
  Dado que o usuario esta autenticado com credenciais validas
  Quando chamar o endpoint de cupons com per_page igual a 1
  Entao a API deve retornar status de sucesso
  E no maximo 1 cupom na resposta
```
