module.exports = {
  moduleDirectories: ['node_modules', __dirname],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/serviceWorker.js',
    '!<rootDir>/src/components/mockHelpers/index.js',
    '!<rootDir>/src/tests/helpers/index.js',
    '!<rootDir>/src/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: ['text', 'html'],
};
