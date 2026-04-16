const { createCoupon } = require("../../src/clients/couponsClient");
const { buildCouponPayload } = require("../helpers/couponFactory");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - campos obrigatorios", () => {
  it("CT-US003-05 - deve rejeitar payload sem campo obrigatorio", async () => {
    const payload = buildCouponPayload();
    delete payload.code;

    const response = await createCoupon(payload);
    if (shouldSkipForEnvironment(response, "required-fields")) return;
    expect([400, 422]).toContain(response.status);
  });
});
