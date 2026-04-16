module.exports = {
  type: "object",
  properties: {
    code: { type: ["string", "null"] },
    message: { type: ["string", "null"] },
    data: {
      type: ["object", "null"],
      properties: {
        status: { type: ["integer", "null"] }
      },
      additionalProperties: true
    }
  },
  additionalProperties: true
};
