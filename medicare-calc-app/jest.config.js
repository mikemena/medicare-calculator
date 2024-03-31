module.exports = {
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
