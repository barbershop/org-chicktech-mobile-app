import React from 'react';
import FeedScreen from './app/screens/FeedScreen';

import {
  StackNavigator,
} from 'react-navigation';

const MainNavigator = StackNavigator({
  FeedScreen: { screen: FeedScreen }
});

export default MainNavigator;