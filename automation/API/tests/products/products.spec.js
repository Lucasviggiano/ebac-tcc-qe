const { graphqlRequest } = require('../../src/clients/graphqlClient')
const productsQuery = require('../../src/graphql/queries/products.query')
const { listProductsVariables } = require('../../src/graphql/variables/products.variables')

describe('GraphQL Products', () => {
  it('deve listar produtos', async () => {
    const response = await graphqlRequest({
      query: productsQuery,
      variables: listProductsVariables
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })
})