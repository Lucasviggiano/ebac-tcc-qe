const env = require('../../config/env')

module.exports = {
  applyCouponVariables: {
    code: env.defaultCoupon
  },

  invalidCouponVariables: {
    code: 'CUPOM_INVALIDO_TESTE'
  }
}