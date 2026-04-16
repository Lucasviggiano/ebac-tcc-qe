module.exports = {
  type: "array",
  description: "Legacy schema mantido para evitar quebra de import antigo.",
  items: {
    type: "object",
    properties: {
      id: { type: ["string", "integer"] },
      name: { type: "string" }
    },
    additionalProperties: true
  }
};
