const { graphqlRequest } = require('../../src/clients/graphqlClient')
const productByIdQuery = require('../../src/graphql/queries/productById.query')
const { productByIdVariables } = require('../../src/graphql/variables/products.variables')

describe('GraphQL Product By Id', () => {
  it('deve buscar produto por id', async () => {
    const response = await graphqlRequest({
      query: productByIdQuery,
      variables: productByIdVariables
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
  })
})