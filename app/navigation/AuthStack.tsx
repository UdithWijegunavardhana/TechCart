import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../features/auth/screens/SignIn';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

export default AuthStack;
