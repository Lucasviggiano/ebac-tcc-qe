# Automacao API - Cupons (Supertest)

Camada de testes de API alinhada ao requisito US-0003 do TCC.

## Escopo

- autenticacao Basic
- listagem de cupons
- consulta de cupom por ID
- criacao de cupom
- validacao de duplicidade
- validacao de campos obrigatorios
- validacao de contrato de resposta
- alinhamento com o PDF US003 (credenciais e payload base)

## Casos incorporados do repositorio oficial

Além da suite US003 (cupons), foram incorporados os casos de API existentes no repositório oficial para manter cobertura historica:

- smoke GraphQL
- products (listagem e busca por ID)
- cart (consulta e adicao)
- checkout
- contratos GraphQL legados
- cenario de aplicacao de cupom GraphQL legado

Esses cenarios usam o endpoint GraphQL (`/graphql`) e ficam disponiveis via scripts dedicados.

## Credenciais padrao (PDF US003)

- usuario: `admin_ebac`
- senha: `@admin!&b@c!2022`
- header equivalente: `Authorization: Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy`

## Payload base para criacao de cupom

```json
{
  "code": "nomeCupom",
  "amount": "10.00",
  "discount_type": "fixed_product",
  "description": "Cupom de teste"
}
```

## Setup

```bash
npm ci
cp .env.example .env
```

## Execucao

```bash
npm run test:api
npm run test:api:all
npm run test:api:smoke
npm run test:api:products
npm run test:api:cart
npm run test:api:checkout
npm run test:api:coupons
npm run test:api:contracts
```

## Politica para indisponibilidade de ambiente

Quando o endpoint remoto responder `5xx`, os testes aplicam `ENV-SKIP` para evitar falso negativo de requisito. Quando a API responde normalmente, os asserts funcionais e de contrato sao aplicados de forma estrita.

## Estrutura

```text
src/
  clients/
    graphqlClient.js
    couponsClient.js
  config/
    env.js
    routes.js
  graphql/
    mutations/
    queries/
    variables/
  schemas/
    coupon.schema.js
    error.schema.js
  utils/
    contractValidator.js
tests/
  smoke/
    health.spec.js
  products/
    products.spec.js
    productById.spec.js
  cart/
    cart.spec.js
    addToCart.spec.js
  checkout/
    checkout.spec.js
  coupons/
    applyCoupon.spec.js
    auth.spec.js
    list-coupons.spec.js
    get-coupon-by-id.spec.js
    create-coupon.spec.js
    duplicate-coupon.spec.js
    required-fields.spec.js
  contracts/
    coupons-contract.spec.js
```
