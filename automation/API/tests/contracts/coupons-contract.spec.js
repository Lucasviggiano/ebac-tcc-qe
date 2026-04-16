const { listCoupons, getCouponById, createCoupon, env } = require("../../src/clients/couponsClient");
const { validateSchema } = require("../../src/utils/contractValidator");
const couponSchema = require("../../src/schemas/coupon.schema");
const couponListSchema = require("../../src/schemas/coupon-list.schema");
const couponCreateSchema = require("../../src/schemas/coupon-create-response.schema");
const errorSchema = require("../../src/schemas/error.schema");
const { buildCouponPayload } = require("../helpers/couponFactory");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - Contratos da API de cupons", () => {
  it("deve validar contrato da listagem de cupons", async () => {
    const response = await listCoupons();
    if (shouldSkipForEnvironment(response, "contract-list")) return;
    expect(response.status).toBe(200);

    const result = validateSchema(couponListSchema, response.body);
    expect(result.valid).toBe(true);
  });

  it("deve validar contrato de busca por ID", async () => {
    const listResponse = await listCoupons();
    if (shouldSkipForEnvironment(listResponse, "contract-get-list-step")) return;
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBeGreaterThan(0);

    const fallbackId = listResponse.body[0].id;
    const preferredId = Number(env.existingCouponId) || null;
    let response = preferredId ? await getCouponById(preferredId) : null;
    if (response && shouldSkipForEnvironment(response, "contract-get-by-id-preferred")) return;

    if (!response || response.status === 404) {
      response = await getCouponById(fallbackId);
    }

    if (shouldSkipForEnvironment(response, "contract-get-by-id")) return;
    expect(response.status).toBe(200);

    const result = validateSchema(couponSchema, response.body);
    expect(result.valid).toBe(true);
  });

  it("deve validar contrato da criacao de cupom", async () => {
    const payload = buildCouponPayload();
    const response = await createCoupon(payload);
    if (shouldSkipForEnvironment(response, "contract-create")) return;
    expect([200, 201]).toContain(response.status);
    expect(response.body.discount_type).toBe("fixed_product");

    const result = validateSchema(couponCreateSchema, response.body);
    expect(result.valid).toBe(true);
  });

  it("deve validar contrato de erro para duplicidade", async () => {
    const payload = buildCouponPayload();
    const first = await createCoupon(payload);
    if (shouldSkipForEnvironment(first, "contract-duplicate-first")) return;
    expect([200, 201]).toContain(first.status);

    const duplicate = await createCoupon(payload);
    if (shouldSkipForEnvironment(duplicate, "contract-duplicate-second")) return;
    expect([400, 409]).toContain(duplicate.status);

    const result = validateSchema(errorSchema, duplicate.body);
    expect(result.valid).toBe(true);
  });
});
