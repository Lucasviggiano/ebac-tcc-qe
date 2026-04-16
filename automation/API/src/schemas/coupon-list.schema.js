module.exports = {
  type: "array",
  minItems: 0,
  items: {
    type: "object",
    required: ["id", "code"],
    properties: {
      id: { type: "integer" },
      code: { type: "string" }
    },
    additionalProperties: true
  }
};
