import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import {useAuth} from '../contexts/AuthContext';
import AuthStack from './AuthStack';

const AppNavigator = () => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
