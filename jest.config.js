module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-clone-referenced-element' +
      '|react-redux' +
      '|react-hook-form' +
      '|@reduxjs/toolkit' + // 👈 add this
      '|immer' + // 👈 add this
      ')/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};
