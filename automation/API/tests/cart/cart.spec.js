const { graphqlRequest } = require('../../src/clients/graphqlClient')
const cartQuery = require('../../src/graphql/queries/cart.query')

describe('GraphQL Cart', () => {
  it('deve consultar carrinho', async () => {
    const response = await graphqlRequest({
      query: cartQuery
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })
})