module.exports = {
  setupFilesAfterEnv: ['<rootDir>/enzyme.js'],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/__mocks__/mocks.js',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@redux(.*)$': '<rootDir>/src/redux$1'
  }
};
