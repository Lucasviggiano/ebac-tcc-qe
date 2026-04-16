const BaseScreen = require('./base.screen')
const selectors = require('../selectors/android/product.selectors')

class ProductScreen extends BaseScreen {
  async getVisibleText() {
    return this.getText(selectors.visibleText)
  }

  async isProductScreenVisible() {
    return this.isDisplayed(selectors.visibleText)
  }
}

module.exports = new ProductScreen()