# AC-US002 - Login na plataforma

## Historia de usuario

Como cliente da EBAC Shop  
Quero me autenticar  
Para acessar meus dados de conta e pedidos

## Regras de negocio

- apenas usuario ativo pode entrar
- login/senha invalidos devem gerar erro
- 3 tentativas consecutivas invalidas bloqueiam login por 15 minutos

## Criterios em Gherkin

```gherkin
Funcionalidade: Autenticacao de usuario

Cenario: Login com credenciais validas para usuario ativo
  Dado que o usuario esta ativo
  E esta na tela de login
  Quando informar credenciais validas
  Entao deve acessar o painel Minha Conta

Cenario: Exibir erro para senha invalida
  Dado que o usuario esta na tela de login
  Quando informar senha invalida
  Entao o sistema deve exibir mensagem de autenticacao invalida

Cenario: Impedir acesso de usuario inativo
  Dado que o usuario esta inativo
  Quando informar credenciais validas
  Entao o sistema deve negar o acesso
  E exibir mensagem de usuario inativo

Cenario: Bloquear apos tres tentativas invalidas consecutivas
  Dado que o usuario esta ativo
  Quando informar senha incorreta por 3 tentativas consecutivas
  Entao o sistema deve bloquear temporariamente o login por 15 minutos

Cenario: Nao bloquear com apenas 2 tentativas invalidas
  Dado que o usuario esta ativo
  Quando informar senha incorreta por 2 tentativas consecutivas
  Entao o sistema nao deve bloquear o login
  E deve permitir nova tentativa imediata
```
