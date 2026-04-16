const catalogScreen = require("../../screens/catalog.screen");
const productsData = require("../../data/products.json");

describe("Catalogo de Produtos - Listagem", () => {
  it("CT-MOB-02 - deve exibir tela inicial do aplicativo", async () => {
    const isInitialScreenVisible = await catalogScreen.validateInitialScreenLoaded();
    await expect(isInitialScreenVisible).toBe(true);
  });

  it("CT-MOB-03 - deve exibir texto principal esperado", async () => {
    const visibleText = await catalogScreen.getInitialTitleText();
    await expect(visibleText).toBe(productsData.catalogTitleText);
  });

  it("CT-MOB-04 - deve exibir botao de entrada da loja", async () => {
    const isButtonVisible = await catalogScreen.isEnterStoreAddressButtonVisible();
    await expect(isButtonVisible).toBe(true);
  });
});
