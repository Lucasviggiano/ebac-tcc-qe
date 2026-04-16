const path = require('path')

exports.config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  specs: [path.resolve(__dirname, '../tests/**/*.js')],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'EBAC_ANDROID',
      'appium:app': path.resolve(__dirname, '../app/android/loja-ebac.apk'),
      'appium:appPackage': 'com.woocommerce.android',
      'appium:appActivity': 'com.woocommerce.android.ui.main.MainActivity',
      'appium:appWaitActivity': '*',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
      'appium:adbExecTimeout': 120000,
      'appium:androidInstallTimeout': 120000,
      'appium:uiautomator2ServerInstallTimeout': 120000,
      'appium:uiautomator2ServerLaunchTimeout': 120000,
      'appium:appWaitDuration': 120000
    }
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
}