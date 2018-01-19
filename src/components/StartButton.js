import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class StartButton extends React.PureComponent {
    render() {
        const { onPress, style } = this.props;
        return (
            <TouchableHighlight onPress={onPress}>
                <View style={[styles.button, style]}>
                    <Text style={[styles.text]}>
                        {this.props.children}
                    </Text>
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
    },
    text: {
        color: 'white',
        fontFamily: 'Avenir',
        fontWeight: '900',
        fontStyle: 'italic',
        fontSize: 20
    }
})