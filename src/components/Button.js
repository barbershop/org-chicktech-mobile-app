import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default class StartButton extends React.PureComponent {
    render() {
        const { onPress, style } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})