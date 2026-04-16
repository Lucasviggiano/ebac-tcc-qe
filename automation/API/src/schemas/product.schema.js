module.exports = {
  type: 'object',
  required: ['id', 'databaseId', 'name'],
  properties: {
    id: { type: 'string' },
    databaseId: { type: 'integer' },
    name: { type: 'string' },
    slug: { type: 'string' },
    type: { type: 'string' },
    price: { type: ['string', 'null'] },
    regularPrice: { type: ['string', 'null'] },
    salePrice: { type: ['string', 'null'] }
  },
  additionalProperties: true
}