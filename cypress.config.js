const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,                  // graba el video de toda la corrida
  screenshotOnRunFailure: true, // captura automática cuando una prueba falla
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
