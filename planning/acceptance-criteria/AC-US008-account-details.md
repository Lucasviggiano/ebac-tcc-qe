# AC-US008 - Detalhes da Conta

## Historia de usuario

Como cliente autenticado  
Quero atualizar meus dados de conta  
Para manter meu cadastro correto e seguro

## Criterios em Gherkin

```gherkin
Funcionalidade: Detalhes da Conta

Cenario: Exibir dados atuais do usuario
  Dado que o cliente esta autenticado
  Quando acessar a secao Detalhes da conta
  Entao o sistema deve exibir os dados atuais do usuario

Cenario: Atualizar dados basicos da conta com sucesso
  Dado que o cliente esta autenticado
  Quando alterar nome e email com valores validos
  Entao o sistema deve salvar os dados com sucesso

Cenario: Alterar senha com confirmacao valida
  Dado que o cliente esta autenticado
  Quando informar senha atual e nova senha valida
  Entao o sistema deve atualizar a senha

Cenario: Impedir alteracao de senha com confirmacao divergente
  Dado que o cliente esta autenticado
  Quando informar confirmacao de senha diferente da nova senha
  Entao o sistema deve exibir mensagem de erro de confirmacao
```
