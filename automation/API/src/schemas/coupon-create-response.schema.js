module.exports = {
  type: "object",
  required: ["id", "code", "amount", "discount_type", "description"],
  properties: {
    id: { type: "integer" },
    code: { type: "string" },
    amount: { type: ["string", "number", "null"] },
    discount_type: { type: "string", enum: ["fixed_product"] },
    description: { type: ["string", "null"] }
  },
  additionalProperties: true
};
