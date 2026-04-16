function buildCouponPayload(overrides = {}) {
  const timestamp = Date.now();
  return {
    code: `TCCAUTO${timestamp}`,
    amount: "10.00",
    discount_type: "fixed_product",
    description: "Cupom de teste",
    ...overrides
  };
}

module.exports = {
  buildCouponPayload
};
