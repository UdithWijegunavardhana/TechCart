module.exports = {
  preset: 'react-native',
  // Detox tests under e2e/ run through e2e/jest.config.js, not here.
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-clone-referenced-element' +
      '|react-redux' +
      '|react-hook-form' +
      '|@reduxjs/toolkit' +
      '|immer' +
      ')/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};
