const { listCouponsWithInvalidAuth } = require("../../src/clients/couponsClient");
const { shouldSkipForEnvironment } = require("../helpers/environmentGuard");

describe("US003 - API de cupons - autenticacao", () => {
  it("CT-US003-06 - deve negar acesso com credencial invalida", async () => {
    const response = await listCouponsWithInvalidAuth();
    if (shouldSkipForEnvironment(response, "auth-invalid")) return;

    expect([401, 403]).toContain(response.status);
  });
});
