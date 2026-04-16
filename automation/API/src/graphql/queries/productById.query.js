module.exports = `
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      databaseId
      name
      slug
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
    }
  }
`