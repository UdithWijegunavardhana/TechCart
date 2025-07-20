import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import {useAuth} from '../contexts/AuthContext';
import AuthStack from './stackNavigators/AuthStack';
import {useDispatch} from 'react-redux';
import {authSagaActions} from '../features/auth/saga/authSagaActions';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useAuth();

  useEffect(() => {
    dispatch(authSagaActions.restoreSession());
  }, [dispatch]);

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
