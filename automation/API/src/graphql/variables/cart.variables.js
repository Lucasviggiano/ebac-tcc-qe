const env = require('../../config/env')

module.exports = {
  listProductsVariables: {
    first: 10
  },

  productByIdVariables: {
    id: String(env.defaultProductId)
  }
}