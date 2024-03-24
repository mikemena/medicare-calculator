// jest.config.js
module.exports = {
  setupFilesAfterEnv: [
    './node_modules/@testing-library/jest-dom/extend-expect',
  ],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
