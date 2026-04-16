# AC-US005 - Painel Minha Conta

## Historia de usuario

Como cliente autenticado  
Quero visualizar o painel Minha Conta  
Para acessar atalhos de gestao da minha conta

## Criterios em Gherkin

```gherkin
Funcionalidade: Painel Minha Conta

Cenario: Acessar painel apos login valido
  Dado que o cliente realizou login com sucesso
  Quando acessar Minha Conta
  Entao o sistema deve exibir o painel do usuario

Cenario: Exibir opcoes de navegacao da conta
  Dado que o cliente esta no painel Minha Conta
  Quando visualizar o menu lateral
  Entao o sistema deve exibir opcoes como Pedidos, Enderecos e Detalhes da conta

Cenario: Redirecionar usuario nao autenticado
  Dado que o cliente nao esta autenticado
  Quando tentar acessar Minha Conta
  Entao o sistema deve redirecionar para a tela de login

Cenario: Encerrar sessao pelo painel
  Dado que o cliente esta autenticado
  Quando clicar em logout
  Entao o sistema deve encerrar a sessao
  E voltar para tela de login
```
