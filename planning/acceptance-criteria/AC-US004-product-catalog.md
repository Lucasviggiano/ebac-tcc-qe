# AC-US004 - Catalogo de produtos (Web)

## Historia de usuario

Como cliente da loja  
Quero navegar no catalogo de produtos  
Para encontrar itens para compra

## Criterios em Gherkin

```gherkin
Funcionalidade: Catalogo de produtos web

Cenario: Exibir lista de produtos na pagina da loja
  Dado que o cliente acessa a pagina de produtos
  Quando a pagina carregar
  Entao o sistema deve exibir os cards de produtos

Cenario: Buscar produto por nome
  Dado que o cliente esta na pagina de produtos
  Quando pesquisar por um nome valido
  Entao o sistema deve retornar resultados relacionados

Cenario: Exibir mensagem para busca sem resultado
  Dado que o cliente esta na pagina de produtos
  Quando pesquisar por um termo inexistente
  Entao o sistema deve informar que nao ha resultados

Cenario: Abrir detalhes do produto selecionado
  Dado que o cliente esta na pagina de produtos
  Quando clicar em um produto da lista
  Entao o sistema deve abrir a pagina de detalhes do produto
```
