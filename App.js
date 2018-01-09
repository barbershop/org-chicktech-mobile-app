import React from 'react';
import FeedScreen from './app/screens/FeedScreen';
import CameraScreen from './app/screens/CameraScreen';
import StickersScreen from './app/screens/StickersScreen';
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  FeedScreen: { screen: FeedScreen },
  CameraScreen: { screen: CameraScreen },
  StickersScreen: { screen: StickersScreen }
});

export default App;