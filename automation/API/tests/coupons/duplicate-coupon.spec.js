const { createCoupon } = require("../../src/clients/couponsClient");
const { buildCouponPayload } = require("../helpers/couponFactory");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - duplicidade", () => {
  it("CT-US003-04 - deve impedir cadastro duplicado", async () => {
    const payload = buildCouponPayload();

    const firstResponse = await createCoupon(payload);
    if (shouldSkipForEnvironment(firstResponse, "duplicate-coupon-create-first")) return;
    expect([200, 201]).toContain(firstResponse.status);

    const duplicateResponse = await createCoupon(payload);
    if (shouldSkipForEnvironment(duplicateResponse, "duplicate-coupon-create-second")) return;
    expect([400, 409]).toContain(duplicateResponse.status);
  });
});
