import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import SearchScreen from '../features/search/screens/Search';
import ProfileScreen from '../features/profile/screens/Profile';
import HomeStack from './stackNavigators/HomeStack';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string) => {
  let iconName: string = 'home';
  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Search':
      iconName = 'search';
      break;
    case 'Profile':
      iconName = 'user';
      break;
  }

  return ({color, size}: {color: string; size: number}) => (
    <Feather name={iconName} color={color} size={size} />
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
