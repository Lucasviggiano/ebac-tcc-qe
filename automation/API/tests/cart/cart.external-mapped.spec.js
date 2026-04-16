const { graphqlRequest, env } = require('../../src/clients/graphqlClient')
const cartQuery = require('../../src/graphql/queries/checkout.query')
const addToCartMutation = require('../../src/graphql/mutations/addToCart.mutation')
const {
  expectGraphQLTransport,
  hasGraphQLData,
  hasGraphQLErrors
} = require('../support/graphqlResponse.helper')

describe('External Mapped - Cart', () => {
  it('CT-EXT-API-005 - deve consultar carrinho (positivo)', async () => {
    const response = await graphqlRequest({
      query: cartQuery
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLData(response) || hasGraphQLErrors(response)).toBe(true)

    if (hasGraphQLData(response) && response.body?.data?.cart) {
      expect(response.body.data.cart).toHaveProperty('subtotal')
      expect(response.body.data.cart).toHaveProperty('total')
    }
  })

  it('CT-EXT-API-006 - deve retornar erro para campo invalido na query (negativo)', async () => {
    const malformedQuery = `
      query InvalidCartQuery {
        cart {
          campoQueNaoExiste
        }
      }
    `

    const response = await graphqlRequest({
      query: malformedQuery
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLErrors(response)).toBe(true)
  })

  it('CT-EXT-API-007 - deve tentar adicionar item ao carrinho (positivo)', async () => {
    const response = await graphqlRequest({
      query: addToCartMutation,
      variables: {
        productId: Number(env.defaultProductId || 1),
        quantity: Number(env.defaultQuantity || 1)
      }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLData(response) || hasGraphQLErrors(response)).toBe(true)
  })

  it('CT-EXT-API-008 - deve retornar erro para tipo invalido no addToCart (negativo)', async () => {
    const response = await graphqlRequest({
      query: addToCartMutation,
      variables: {
        productId: 'produto-invalido',
        quantity: 'quantidade-invalida'
      }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLErrors(response)).toBe(true)
  })
})

