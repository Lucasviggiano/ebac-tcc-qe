module.exports = `
  mutation AddToCart($productId: Int!, $quantity: Int!) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cartItem {
        key
        quantity
        product {
          node {
            id
            databaseId
            name
          }
        }
      }
    }
  }
`