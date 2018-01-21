import React from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';

import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    ScrollView,
    State,
} from 'react-native-gesture-handler';

var screenWidth = Dimensions.get('window').width;

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);

        /* Pinching */
        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._lastScale = 1;
        this._onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this._pinchScale } }],
            { useNativeDriver: false }
        );

        /* Rotation */
        this._rotate = new Animated.Value(0);
        this._rotateStr = this._rotate.interpolate({
            inputRange: [-100, 100],
            outputRange: ['-100rad', '100rad'],
        });
        this._lastRotate = 0;
        this._onRotateGestureEvent = Animated.event(
            [{ nativeEvent: { rotation: this._rotate } }],
            { useNativeDriver: false }
        );

        /* Drag */
        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);
        this._lastOffset = { x: 0, y: 0 };
        this._onDragGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this._translateX,
                        translationY: this._translateY,
                    },
                },
            ],
            { useNativeDriver: false }
        );
    }
    _onDragHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += event.nativeEvent.translationX;
            this._lastOffset.y += event.nativeEvent.translationY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(0);
        }
    };
    _onRotateHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastRotate += event.nativeEvent.rotation;
            this._rotate.setOffset(this._lastRotate);
            this._rotate.setValue(0);
        }
    };
    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
        }
    };

    render() {
        return (
            <PanGestureHandler
                onGestureEvent={this._onDragGestureEvent}
                onHandlerStateChange={this._onDragHandlerStateChange}
                id={`image_drag_${this.props.id}`}>
                <RotationGestureHandler
                    id={`image_rotation_${this.props.id}`}
                    simultaneousHandlers={`image_pinch_${this.props.id}`}
                    onGestureEvent={this._onRotateGestureEvent}
                    onHandlerStateChange={this._onRotateHandlerStateChange}>
                    <PinchGestureHandler
                        id={`image_pinch_${this.props.id}`}
                        simultaneousHandlers={`image_rotation_${this.props.id}`}
                        onGestureEvent={this._onPinchGestureEvent}
                        onHandlerStateChange={this._onPinchHandlerStateChange}>
                        <Animated.Image
                            style={[
                                styles.pinchableImage,
                                {
                                    transform: [
                                        { perspective: 200 },
                                        { scale: this._scale },
                                        { rotate: this._rotateStr },
                                        { translateX: this._translateX },
                                        { translateY: this._translateY },
                                    ],
                                    zIndex: this.props.zIndex
                                },
                            ]}
                            source={this.props.source}
                            resizeMode="contain"
                        />
                    </PinchGestureHandler>
                </RotationGestureHandler>
            </PanGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    pinchableImage: {
        width: 300,
        height: 300,
        position: 'absolute',
        left: (screenWidth / 2) - 150,
        top: (screenWidth / 2) - 150
    },
});