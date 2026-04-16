# Testes de performance com k6

Configuracao exigida pelo enunciado:

- usuarios virtuais: 20
- tempo de execucao: 2 minutos
- ramp-up: 20 segundos
- massa de dados: `user1_ebac` ate `user5_ebac` com senha `psw!ebac@test`

## Execucao

```bash
k6 run login-performance.js
k6 run catalog-performance.js
```
