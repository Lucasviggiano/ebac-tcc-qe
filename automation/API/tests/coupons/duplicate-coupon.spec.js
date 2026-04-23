const { createCoupon } = require("../../src/clients/couponsClient");
const { buildCouponPayload } = require("../helpers/couponFactory");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

function toDebugString(response) {
  const bodyPreview = JSON.stringify(response?.body ?? null).slice(0, 500);
  return `status=${response?.status} body=${bodyPreview}`;
}

function assertStatus(response, allowedStatuses, context) {
  if (!allowedStatuses.includes(response?.status)) {
    throw new Error(`${context} - esperado [${allowedStatuses.join(", ")}], recebido ${toDebugString(response)}`);
  }
}

describe("US003 - API de cupons - duplicidade", () => {
  it("CT-US003-04 - deve impedir cadastro duplicado", async () => {
    const payload = buildCouponPayload();

    const firstResponse = await createCoupon(payload);
    if (shouldSkipForEnvironment(firstResponse, "duplicate-coupon-create-first")) return;
    assertStatus(firstResponse, [200, 201], "duplicate-coupon-create-first");

    const duplicateResponse = await createCoupon(payload);
    if (shouldSkipForEnvironment(duplicateResponse, "duplicate-coupon-create-second")) return;
    assertStatus(duplicateResponse, [400, 409], "duplicate-coupon-create-second");
  }, 10000);
});
