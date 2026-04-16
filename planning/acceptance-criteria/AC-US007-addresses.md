# AC-US007 - Enderecos

## Historia de usuario

Como cliente autenticado  
Quero gerenciar meus enderecos  
Para facilitar entregas e cobranca

## Criterios em Gherkin

```gherkin
Funcionalidade: Enderecos da conta

Cenario: Exibir endereco de cobranca e entrega
  Dado que o cliente esta autenticado
  Quando acessar a secao Enderecos
  Entao o sistema deve exibir endereco de cobranca e de entrega

Cenario: Permitir editar endereco existente
  Dado que o cliente esta autenticado
  E possui endereco cadastrado
  Quando editar os dados e salvar
  Entao o sistema deve persistir o novo endereco com sucesso

Cenario: Exibir validacao para campo obrigatorio vazio
  Dado que o cliente esta editando um endereco
  Quando tentar salvar com campo obrigatorio vazio
  Entao o sistema deve exibir mensagem de validacao

Cenario: Impedir acesso de usuario nao autenticado
  Dado que o usuario nao esta autenticado
  Quando tentar acessar a secao Enderecos
  Entao o sistema deve redirecionar para login
```
