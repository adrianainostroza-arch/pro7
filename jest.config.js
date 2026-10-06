module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'mjs', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.m?js$': 'babel-jest'
  },
  // Vuetify se distribuye como ES Modules: hay que transpilarlo para Jest
  transformIgnorePatterns: ['/node_modules/(?!vuetify)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/styles$': '<rootDir>/tests/unit/__mocks__/styleMock.js',
    '\\.(css|scss|sass)$': '<rootDir>/tests/unit/__mocks__/styleMock.js'
  },
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  testMatch: ['<rootDir>/tests/unit/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js', '!src/plugins/**'],
  coverageDirectory: 'docs/evidencias/coverage'
}
