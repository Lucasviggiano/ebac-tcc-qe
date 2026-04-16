const { listCoupons } = require("../../src/clients/couponsClient");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - listagem", () => {
  it("CT-US003-01 - deve listar cupons com autenticacao valida", async () => {
    const response = await listCoupons();
    if (shouldSkipForEnvironment(response, "list-coupons")) return;

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("CT-US003-07 - deve listar cupons com paginacao", async () => {
    const response = await listCoupons({ per_page: 1, page: 1 });
    if (shouldSkipForEnvironment(response, "list-coupons-pagination")) return;

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(1);
  });
});
