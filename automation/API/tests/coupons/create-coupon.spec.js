const { createCoupon } = require("../../src/clients/couponsClient");
const { buildCouponPayload } = require("../helpers/couponFactory");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - criacao", () => {
  it("CT-US003-03 - deve criar cupom com payload valido", async () => {
    const payload = buildCouponPayload();
    const response = await createCoupon(payload);
    if (shouldSkipForEnvironment(response, "create-coupon")) return;

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty("id");
    expect(String(response.body.code).toLowerCase()).toBe(payload.code.toLowerCase());
    expect(String(response.body.amount)).toBe(payload.amount);
    expect(response.body.discount_type).toBe("fixed_product");
    expect(response.body.description).toBe(payload.description);
  });
});
