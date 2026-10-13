// react-native-config@1.5.9 declares a codegenConfig but never generates its
// native codegen output on Android, so autolinking's CMake entry points at a
// directory that does not exist. Keep the Java module linked (it reads .env),
// but skip the native CMake/codegen linking.
module.exports = {
  dependencies: {
    'react-native-config': {
      platforms: {
        android: {
          libraryName: null,
          cmakeListsPath: null,
        },
      },
    },
  },
};
