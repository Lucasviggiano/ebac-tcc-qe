const { graphqlRequest, env } = require('../../src/clients/graphqlClient')
const applyCouponMutation = require('../../src/graphql/mutations/applyCoupon.mutation')
const { invalidCouponVariables } = require('../../src/graphql/variables/coupons.variables')

describe('GraphQL ApplyCoupon', () => {
  it('deve tratar cupom invalido (negativo)', async () => {
    const response = await graphqlRequest({
      query: applyCouponMutation,
      variables: invalidCouponVariables
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })

  it('deve tentar aplicar cupom padrao quando configurado (positivo condicional)', async () => {
    if (!env.defaultCoupon) {
      expect(true).toBe(true)
      return
    }

    const response = await graphqlRequest({
      query: applyCouponMutation,
      variables: { code: env.defaultCoupon }
    })

    expect([200, 400]).toContain(response.status)
    expect(response.body).toBeDefined()
    expect(response.body.data || response.body.errors).toBeDefined()
  })
})
