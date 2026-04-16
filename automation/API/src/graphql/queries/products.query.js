module.exports = `
  query GetProducts($first: Int = 10) {
    products(first: $first) {
      nodes {
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
  }
`