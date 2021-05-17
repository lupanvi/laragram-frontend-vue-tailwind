module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "testMatch": [
      "<rootDir>/src/**/*.(spec|test).(ts|js)"
  ],
  // support the same @ -> src alias mapping in source code
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "collectCoverage": false,
  "collectCoverageFrom": [
    "**/*.{js,vue}", 
    "!**/node_modules/**", 
    "!**/coverage/**",
    "!**/dist/**"
    ]
}