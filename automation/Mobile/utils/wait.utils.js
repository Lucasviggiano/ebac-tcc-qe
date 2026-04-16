async function waitForDisplayed(locator, timeout = 10000) {
  const element = await $(locator);
  await element.waitForDisplayed({ timeout });
  return element;
}

async function waitForClickable(locator, timeout = 10000) {
  const element = await $(locator);
  await element.waitForClickable({ timeout });
  return element;
}

module.exports = {
  waitForDisplayed,
  waitForClickable
};
