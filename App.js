import React from 'react';
import GetStartedScreen from './src/screens/GetStartedScreen';
import FeedScreen from './src/screens/FeedScreen';
import CameraScreen from './src/screens/CameraScreen';

import {
  StackNavigator,
} from 'react-navigation';

const MainNavigator = StackNavigator({
  GetStartedScreen: { screen: GetStartedScreen },
  FeedScreen: { screen: FeedScreen },
  CameraScreen: { screen: CameraScreen }
});

export default MainNavigator;