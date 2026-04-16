module.exports = {
  type: "object",
  required: ["id", "code", "amount", "discount_type"],
  properties: {
    id: { type: "integer" },
    code: { type: "string" },
    amount: { type: ["string", "number"] },
    discount_type: { type: "string" },
    description: { type: ["string", "null"] },
    date_created: { type: ["string", "null"] },
    date_modified: { type: ["string", "null"] }
  },
  additionalProperties: true
};
