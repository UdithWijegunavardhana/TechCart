module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['e2e/**/*.js'],
      env: {jest: true},
      globals: {
        device: 'readonly',
        element: 'readonly',
        by: 'readonly',
        waitFor: 'readonly',
        detox: 'readonly',
      },
    },
  ],
};
