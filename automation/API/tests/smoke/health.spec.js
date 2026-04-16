const { api, routes } = require('../../src/clients/graphqlClient')

describe('GraphQL Smoke', () => {
  it('deve responder no endpoint graphql', async () => {
    const response = await api.post(routes.graphql).send({ query: '{ __typename }' })
    expect(response.status).toBeGreaterThanOrEqual(200)
    expect(response.status).toBeLessThan(500)
  })
})