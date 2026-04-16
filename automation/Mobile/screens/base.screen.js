const { waitForDisplayed, waitForClickable } = require("../utils/wait.utils");

class BaseScreen {
  async waitForElement(locator, timeout = 10000) {
    return waitForDisplayed(locator, timeout);
  }

  async click(locator) {
    const element = await waitForClickable(locator);
    await element.click();
  }

  async getText(locator) {
    const element = await this.waitForElement(locator);
    return element.getText();
  }

  async isDisplayed(locator) {
    const element = await $(locator);
    return element.isDisplayed();
  }
}

module.exports = BaseScreen;
