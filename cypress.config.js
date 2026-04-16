const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    specPattern: 'automation/UI/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'automation/UI/cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      return config
    }
  }
})
