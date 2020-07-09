module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!src/index.js',
  ],
  verbose: true,
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFilesAfterEnv:[
    '<rootDir>src/setupTests.js'],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/.babelrc',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.(test).{js,jsx}',
    '<rootDir>/src/**/?(*.)(test).{js|jsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/.babelrc',
  ],
};
