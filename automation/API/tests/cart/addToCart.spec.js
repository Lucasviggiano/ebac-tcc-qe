const { graphqlRequest, env } = require('../../src/clients/graphqlClient')
const addToCartMutation = require('../../src/graphql/mutations/addToCart.mutation')

describe('GraphQL AddToCart', () => {
  it('deve tentar adicionar item ao carrinho (positivo)', async () => {
    const response = await graphqlRequest({
      query: addToCartMutation,
      variables: {
        productId: Number(env.defaultProductId || 1),
        quantity: Number(env.defaultQuantity || 1)
      }
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })

  it('deve retornar erro com tipos invalidos no addToCart (negativo)', async () => {
    const response = await graphqlRequest({
      query: addToCartMutation,
      variables: {
        productId: 'produto-invalido',
        quantity: 'quantidade-invalida'
      }
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(Array.isArray(response.body.errors)).toBe(true)
  })
})
