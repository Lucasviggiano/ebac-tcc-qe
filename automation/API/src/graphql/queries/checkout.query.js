module.exports = `
  query GetCart {
    cart {
      contents {
        nodes {
          key
          quantity
          product {
            node {
              id
              databaseId
              name
              slug
            }
          }
        }
      }
      subtotal
      total
    }
  }
`