module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.spec.js"],
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  verbose: true
};
