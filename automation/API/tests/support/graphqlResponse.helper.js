function expectGraphQLTransport(response) {
  expect(response).toBeDefined()
  expect([200, 400]).toContain(response.status)
  expect(response.body).toBeDefined()
  expect(response.body.data || response.body.errors).toBeDefined()
}

function hasGraphQLData(response) {
  return Boolean(response?.body?.data)
}

function hasGraphQLErrors(response) {
  return Array.isArray(response?.body?.errors) && response.body.errors.length > 0
}

module.exports = {
  expectGraphQLTransport,
  hasGraphQLData,
  hasGraphQLErrors
}

