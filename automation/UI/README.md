# Automacao UI - Cypress

## Testing pattern aplicado

- Page Object: `cypress/support/pages`
- App Actions: `cypress/support/actions`

## Suites principais

- `login.cy.js` (US-0002)
- `add-to-cart.cy.js` (US-0001)
- `e2e-purchase-flow.cy.js` (fluxo integrado)

## Execucao

```bash
npm ci
npm run test:ui
```
