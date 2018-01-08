import React from 'react';
import FeedScreen from './screens/FeedScreen';
import CameraScreen from './screens/CameraScreen';
import StickersScreen from './screens/StickersScreen';
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  FeedScreen: { screen: FeedScreen },
  CameraScreen: { screen: CameraScreen },
  StickersScreen: { screen: StickersScreen }
});

export default App;