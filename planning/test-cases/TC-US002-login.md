# TC-US002 - Login na plataforma

| ID | Caso de teste | Tipo | Tecnica | Resultado esperado | Automatizar |
|---|---|---|---|---|---|
| CT-US002-01 | Login com usuario ativo e credenciais validas | Feliz | Particao de equivalencia | Usuario autenticado e redirecionado para Minha Conta | Sim (UI) |
| CT-US002-02 | Login com senha invalida | Negativo | Particao de equivalencia | Mensagem de autenticacao invalida | Sim (UI) |
| CT-US002-03 | Login com usuario inativo | Negativo | Particao de equivalencia | Acesso negado com mensagem de usuario inativo | Nao |
| CT-US002-04 | Bloqueio apos 3 tentativas invalidas | Negativo | Valor limite | Login bloqueado por 15 minutos | Sim (UI) |
| CT-US002-05 | Sem bloqueio com 2 tentativas invalidas | Alternativo | Valor limite | Login ainda nao bloqueado | Sim (UI) |
