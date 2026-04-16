# AC-US006 - Meus Pedidos

## Historia de usuario

Como cliente autenticado  
Quero visualizar meus pedidos  
Para acompanhar status e historico de compras

## Criterios em Gherkin

```gherkin
Funcionalidade: Meus Pedidos

Cenario: Exibir lista de pedidos do usuario
  Dado que o cliente esta autenticado
  Quando acessar a secao Meus Pedidos
  Entao o sistema deve listar os pedidos vinculados ao usuario

Cenario: Exibir estado vazio quando nao houver pedidos
  Dado que o cliente autenticado nao possui pedidos
  Quando acessar a secao Meus Pedidos
  Entao o sistema deve exibir mensagem de nenhum pedido encontrado

Cenario: Abrir detalhes de um pedido da lista
  Dado que o cliente possui pedidos registrados
  Quando selecionar um pedido da lista
  Entao o sistema deve exibir os detalhes desse pedido

Cenario: Impedir acesso de visitante aos pedidos
  Dado que o usuario nao esta autenticado
  Quando tentar acessar Meus Pedidos
  Entao o sistema deve redirecionar para login
```
