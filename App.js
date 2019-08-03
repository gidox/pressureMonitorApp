import React from 'react';
import { createStackNavigator, createNavigationContainer } from 'react-navigation';
import { useScreens } from 'react-native-screens';

import HomeScreen from './Home';
// import SharedElements from './Examples/SharedElements';
import AppearingElements from './AppearingElements';
// import ImageTransition from './Examples/ImageTransition';
import LayoutTransition from './LayoutTransition';
// import Onboarding from './Examples/Onboarding';
import ShoeShop from './ShoeShop';
import FlatList from './FlatList';
import AnimatedProperty from './AnimatedProperty';
// import Playground from './Examples/Playground';

useScreens();

const ExampleNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { title: 'Fluid Transitions' } },
  layout: { screen: LayoutTransition },
  flatlist: { screen: FlatList },
  animatedProperty: { screen: AnimatedProperty },
  appear: { screen: AppearingElements },
  shoes: { screen: ShoeShop },
});

export default createNavigationContainer(ExampleNavigator);