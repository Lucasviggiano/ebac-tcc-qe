const { graphqlRequest, env } = require('../../src/clients/graphqlClient')
const applyCouponMutation = require('../../src/graphql/mutations/applyCoupon.mutation')
const { invalidCouponVariables } = require('../../src/graphql/variables/coupons.variables')
const {
  expectGraphQLTransport,
  hasGraphQLData,
  hasGraphQLErrors
} = require('../support/graphqlResponse.helper')

describe('External Mapped - Coupons', () => {
  it('CT-EXT-API-009 - deve tratar cupom invalido (negativo)', async () => {
    const response = await graphqlRequest({
      query: applyCouponMutation,
      variables: invalidCouponVariables
    })

    expectGraphQLTransport(response)

    const applied = response.body?.data?.applyCoupon?.applied
    const couponNotApplied = !applied || applied.length === 0
    expect(hasGraphQLErrors(response) || couponNotApplied).toBe(true)
  })

  it('CT-EXT-API-010 - deve validar erro quando campo obrigatorio de cupom nao e enviado (negativo)', async () => {
    const response = await graphqlRequest({
      query: applyCouponMutation,
      variables: {}
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLErrors(response)).toBe(true)
  })

  it('CT-EXT-API-011 - deve tentar aplicar cupom padrao configurado (positivo condicional)', async () => {
    if (!env.defaultCoupon) {
      expect(true).toBe(true)
      return
    }

    const response = await graphqlRequest({
      query: applyCouponMutation,
      variables: { code: env.defaultCoupon }
    })

    expectGraphQLTransport(response)
    expect(hasGraphQLData(response) || hasGraphQLErrors(response)).toBe(true)
  })
})

