# Checklist de regressao

## Web UI

- [ ] login valido
- [ ] login invalido
- [ ] adicionar item ao carrinho
- [ ] bloqueio de quantidade acima do limite
- [ ] aplicacao de cupom na faixa esperada
- [ ] continuidade para checkout

## API de cupons

- [ ] listagem com auth valida
- [ ] consulta por ID
- [ ] criacao com payload valido
- [ ] validacao de campo obrigatorio
- [ ] bloqueio de duplicidade
- [ ] acesso sem auth deve falhar
- [ ] contratos validados via schema

## Mobile Android

- [ ] app abre no pacote esperado
- [ ] elementos de catalogo visiveis
- [ ] abrir detalhe de produto

## Performance k6

- [ ] cenario de login executado
- [ ] cenario de catalogo executado
- [ ] configuracao 20 VUs / 2m / ramp-up 20s aplicada

## CI

- [ ] workflow executando jobs de UI, API e k6
- [ ] job mobile smoke disponivel
- [ ] artefatos publicados
