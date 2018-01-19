import React from 'react';
import GetStartedScreen from './src/screens/GetStartedScreen';
import FeedScreen from './src/screens/FeedScreen';

import {
  StackNavigator,
} from 'react-navigation';

const MainNavigator = StackNavigator({
  GetStartedScreen: { screen: GetStartedScreen },
  FeedScreen: { screen: FeedScreen }
});

export default MainNavigator;