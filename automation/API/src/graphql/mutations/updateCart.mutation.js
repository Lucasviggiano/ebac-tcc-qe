module.exports = `
  mutation UpdateItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      items {
        key
        quantity
      }
      total
      subtotal
    }
  }
`