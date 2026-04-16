const BaseScreen = require('./base.screen')
const selectors = require('../selectors/android/catalog.selectors')

class CatalogScreen extends BaseScreen {
  async validateInitialScreenLoaded() {
    return this.isDisplayed(selectors.onboardingTitle)
  }

  async getInitialTitleText() {
    return this.getText(selectors.onboardingTitle)
  }

  async isEnterStoreAddressButtonVisible() {
    return this.isDisplayed(selectors.enterStoreAddressButton)
  }

  async openFirstImage() {
    await this.click(selectors.firstProductImage)
  }
}

module.exports = new CatalogScreen()