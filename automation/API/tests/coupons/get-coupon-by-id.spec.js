const { env, listCoupons, getCouponById } = require("../../src/clients/couponsClient");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - busca por ID", () => {
  it("CT-US003-02 - deve buscar cupom por ID existente", async () => {
    let response;
    let couponId = Number(env.existingCouponId) || null;

    if (couponId) {
      response = await getCouponById(couponId);
      if (shouldSkipForEnvironment(response, "get-coupon-by-id-preferred")) return;
    }

    if (!response || response.status === 404) {
      const listResponse = await listCoupons();
      if (shouldSkipForEnvironment(listResponse, "get-coupon-list-step")) return;
      expect(listResponse.status).toBe(200);
      expect(listResponse.body.length).toBeGreaterThan(0);

      couponId = listResponse.body[0].id;
      response = await getCouponById(couponId);
    }

    if (shouldSkipForEnvironment(response, "get-coupon-by-id")) return;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", couponId);
  });
});
