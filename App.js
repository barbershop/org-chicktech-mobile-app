import React from 'react';
import GetStartedScreen from './app/screens/GetStartedScreen';
import FeedScreen from './app/screens/FeedScreen';

import {
  StackNavigator,
} from 'react-navigation';

const MainNavigator = StackNavigator({
  GetStartedScreen: { screen: GetStartedScreen },
  FeedScreen: { screen: FeedScreen }
});

export default MainNavigator;