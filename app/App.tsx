import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './contexts/AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
