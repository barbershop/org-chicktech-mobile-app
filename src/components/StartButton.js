import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class StartButton extends React.PureComponent {
    render() {
        const { onPress, style } = this.props;
        return (
            <TouchableHighlight onPress={onPress}>
                <View style={[styles.button, style]}>
                    {this.props.children}
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        position: 'absolute',
        bottom: 30,
        left: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})