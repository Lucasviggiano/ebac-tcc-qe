async function swipeUp(duration = 600) {
  const { width, height } = await driver.getWindowRect();

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.8) },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        { type: "pointerMove", duration, x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
        { type: "pointerUp", button: 0 }
      ]
    }
  ]);

  await driver.releaseActions();
}

module.exports = {
  swipeUp
};
