# AC-US001 - Adicionar item ao carrinho

## Historia de usuario

Como cliente da EBAC Shop  
Quero adicionar produtos no carrinho  
Para concluir minha compra com seguranca

## Regras de negocio

- limite de 10 itens por produto
- valor total maximo da compra: R$ 990,00
- de R$ 200,00 ate R$ 600,00: cupom de 10%
- acima de R$ 600,00: cupom de 15%

## Criterios em Gherkin

```gherkin
Funcionalidade: Carrinho de compras

Cenario: Adicionar produto com quantidade valida
  Dado que o cliente esta na pagina de produto
  Quando adicionar ate 10 unidades do mesmo item
  Entao o sistema deve incluir o item no carrinho

Cenario: Bloquear quantidade acima do limite por item
  Dado que o cliente esta na pagina de produto
  Quando tentar adicionar 11 unidades do mesmo item
  Entao o sistema deve impedir a operacao
  E deve informar o limite maximo de 10 itens

Cenario: Disponibilizar cupom de 10 por cento na faixa intermediaria
  Dado que o cliente possui itens no carrinho
  Quando o total ficar entre 200 e 600 reais
  Entao o sistema deve habilitar o cupom de 10 por cento

Cenario: Disponibilizar cupom de 15 por cento na faixa superior
  Dado que o cliente possui itens no carrinho
  Quando o total ficar acima de 600 reais
  Entao o sistema deve habilitar o cupom de 15 por cento

Cenario: Bloquear compra acima do valor permitido
  Dado que o cliente possui itens no carrinho
  Quando o total ultrapassar 990 reais
  Entao o sistema deve bloquear o avancar da compra
```
