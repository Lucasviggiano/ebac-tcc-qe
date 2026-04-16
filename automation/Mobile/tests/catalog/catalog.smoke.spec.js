const productsData = require("../../data/products.json");

describe("Catalogo de Produtos - Smoke", () => {
  it("CT-MOB-01 - deve abrir o aplicativo com pacote esperado", async () => {
    const currentPackage = await driver.getCurrentPackage();
    await expect(currentPackage).toBe(productsData.expectedAppPackage);
  });
});
