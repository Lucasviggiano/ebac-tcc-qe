const catalogScreen = require("../../screens/catalog.screen");
const productScreen = require("../../screens/product.screen");
const { swipeUp } = require("../../utils/gesture.utils");

describe("Catalogo de Produtos - Detalhe do Produto", () => {
  it("CT-MOB-05 - deve abrir detalhe ao tocar na primeira imagem visivel", async () => {
    await catalogScreen.openFirstImage();
    const isProductScreenVisible = await productScreen.isProductScreenVisible();
    await expect(isProductScreenVisible).toBe(true);
  });

  it("CT-MOB-06 - deve manter texto visivel apos interacao de scroll", async () => {
    await catalogScreen.openFirstImage();
    await swipeUp();
    const visibleText = await productScreen.getVisibleText();
    await expect(Boolean(visibleText)).toBe(true);
  });
});
