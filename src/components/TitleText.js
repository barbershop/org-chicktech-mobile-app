import React from 'react';
import { Text } from 'react-native'

export default class TitleText extends React.PureComponent {
    render() {
        return (
            <Text style={[styles.titleText, this.props.style]}>{this.props.children}</Text>
        )
    }
}

const styles = Styles({
    titleText: {
        position: 'absolute',
        width: '100%',
        top: 95,
        left: 0,
        height: 100,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
})