import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/screens/Home';
import ProductDetailsScreen from '../../features/productDetails/screens/ProductDetails';
import CartScreen from '../../features/cart/screens/cart';

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: {productId: number};
  Cart: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
        options={{title: 'Product Detail'}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Cart'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
