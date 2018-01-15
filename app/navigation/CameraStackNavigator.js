
import React from 'react';
import CameraScreen from '../screens/CameraScreen';
import StickersScreen from '../screens/StickersScreen';
import {
    StackNavigator,
} from 'react-navigation';

const CameraStackNavigator = StackNavigator({
    CameraScreen: { screen: CameraScreen },
    StickersScreen: { screen: StickersScreen }
});

export default CameraStackNavigator;