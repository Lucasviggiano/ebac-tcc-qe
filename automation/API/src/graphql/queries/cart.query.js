module.exports = `
  query GetProductById($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      slug
      type
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
    }
  }
`