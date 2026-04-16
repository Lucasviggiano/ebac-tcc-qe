module.exports = `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      applied {
        code
        discountAmount
      }
      cart {
        subtotal
        total
      }
    }
  }
`