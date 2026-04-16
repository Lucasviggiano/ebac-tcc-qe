# API Report - 2026-04-15

## 1. Escopo

Execucao da camada API com foco em US003 (cupons) e suites complementares GraphQL.

## 2. Comando executado

```bash
npm run test:api:all
```

## 3. Resultado

- status: **PASS**
- codigo de saida: `0`
- suites: `18 passed, 18 total`
- testes: `36 passed, 36 total`
- observacao: houve `ENV-SKIP` controlado em cenario de autenticacao invalida por retorno `500` de ambiente

Fonte: `reports/evidence/runs/2026-04-15-full/logs/02-api-all.log`

## 4. Suites cobertas na execucao

- `tests/contracts/coupons-contract.spec.js`
- `tests/checkout/checkout.spec.js`
- `tests/coupons/duplicate-coupon.spec.js`
- `tests/coupons/get-coupon-by-id.spec.js`
- `tests/coupons/create-coupon.spec.js`
- `tests/cart/cart.external-mapped.spec.js`
- `tests/coupons/list-coupons.spec.js`
- `tests/coupons/required-fields.spec.js`
- `tests/coupons/auth.spec.js`
- `tests/products/products.external-mapped.spec.js`
- `tests/products/products.spec.js`
- `tests/contracts/contracts.spec.js`
- `tests/smoke/health.spec.js`
- `tests/coupons/coupons.external-mapped.spec.js`
- `tests/coupons/applyCoupon.spec.js`
- `tests/cart/addToCart.spec.js`
- `tests/products/productById.spec.js`
- `tests/cart/cart.spec.js`

## 5. Conclusao tecnica

- camada API aprovada para a rodada;
- asserts funcionais e de contrato executados com sucesso;
- politica `ENV-SKIP` registrada conforme estrategia definida, sem falso negativo.

## 6. Evidencias

- log completo: `reports/evidence/runs/2026-04-15-full/logs/02-api-all.log`
- ambiente da rodada: `reports/evidence/runs/2026-04-15-full/logs/00-environment.txt`
