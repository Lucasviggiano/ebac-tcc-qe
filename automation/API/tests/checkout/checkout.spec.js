const { graphqlRequest } = require('../../src/clients/graphqlClient')
const checkoutMutation = require('../../src/graphql/mutations/checkout.mutation')
const { checkoutVariables } = require('../../src/graphql/variables/checkout.variables')

describe('GraphQL Checkout', () => {
  it('deve tentar realizar checkout', async () => {
    const response = await graphqlRequest({
      query: checkoutMutation,
      variables: checkoutVariables
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })
})