import React from 'react'
import { StyleSheet } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Appbar } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen.js';
import MyAccount from '../screens/MyAccount';


import { Icon } from 'native-base';


const AppStack = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    MyAccount: { screen: MyAccount },

  },
  {
    shifting: true,
    labeled: true,
    activeColor: '#f0edf6',
    inactiveColor: '#f0edf6',
    barStyle: { backgroundColor: '#694fad' },
  }
);
const AppDrawer = createDrawerNavigator(
  {
    App: AppStack,
  }, {
    initialRouteName: 'App',
    drawerPosition: 'right',
  }
);


const AppSwitchNavigator = createSwitchNavigator(
  {

    AppDrawer: { screen: AppDrawer },

  }, {
    initialRouteName: 'AppDrawer'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
export default () => (
  <AppContainer
  />
);