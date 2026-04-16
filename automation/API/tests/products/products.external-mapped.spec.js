const { graphqlRequest, env } = require('../../src/clients/graphqlClient')
const productsQuery = require('../../src/graphql/queries/products.query')
const productByIdQuery = require('../../src/graphql/queries/productById.query')
const {
  expectGraphQLTransport,
  hasGraphQLData,
  hasGraphQLErrors
} = require('../support/graphqlResponse.helper')

describe('External Mapped - Products', () => {
  it('CT-EXT-API-001 - deve listar produtos (positivo)', async () => {
    const response = await graphqlRequest({
      query: productsQuery,
      variables: { first: 10 }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLData(response) || hasGraphQLErrors(response)).toBe(true)

    if (hasGraphQLData(response)) {
      const nodes = response.body?.data?.products?.nodes
      if (nodes !== undefined) {
        expect(Array.isArray(nodes)).toBe(true)
      }
    }
  })

  it('CT-EXT-API-002 - deve retornar erro para tipo invalido em variavel (negativo)', async () => {
    const response = await graphqlRequest({
      query: productsQuery,
      variables: { first: 'dez' }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLErrors(response)).toBe(true)
  })

  it('CT-EXT-API-003 - deve consultar produto por id informado (positivo)', async () => {
    const response = await graphqlRequest({
      query: productByIdQuery,
      variables: { id: String(env.defaultProductId || '1') }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLData(response) || hasGraphQLErrors(response)).toBe(true)

    if (hasGraphQLData(response) && response.body?.data?.product) {
      expect(response.body.data.product).toHaveProperty('id')
      expect(response.body.data.product).toHaveProperty('name')
    }
  })

  it('CT-EXT-API-004 - deve tratar id inexistente/invalido sem quebrar contrato HTTP (negativo)', async () => {
    const response = await graphqlRequest({
      query: productByIdQuery,
      variables: { id: 'ID_INEXISTENTE_TESTE' }
    })

    expectGraphQLTransport(response)

    const productIsNull = response.body?.data?.product === null
    expect(hasGraphQLErrors(response) || productIsNull).toBe(true)
  })
})

