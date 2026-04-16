module.exports = {
  type: "object",
  description: "Legacy schema mantido apenas para compatibilidade historica do repositorio.",
  properties: {
    items: { type: "array" },
    total: { type: ["string", "number", "null"] }
  },
  additionalProperties: true
};
