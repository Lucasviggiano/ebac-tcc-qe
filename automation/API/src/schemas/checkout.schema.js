module.exports = {
  type: 'object',
  properties: {
    order: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        databaseId: { type: 'integer' },
        orderNumber: { type: ['string', 'null'] },
        status: { type: ['string', 'null'] },
        total: { type: ['string', 'null'] }
      },
      additionalProperties: true
    },
    result: { type: ['string', 'null'] },
    redirect: { type: ['string', 'null'] }
  },
  additionalProperties: true
}