require('dotenv')

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/app/**/*.test.ts"
  ],
  setupFiles: [
    'dotenv/config'
  ],
  // nodeEnv: require('dotenv').config().parsed
};