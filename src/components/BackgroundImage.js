import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class BackgroundImage extends React.PureComponent {
    _getImage = (filename) => {
        switch (filename) {
            case 'background-image.png': return require('../../app/assets/background-image.png')
            default: break;
        }
    }

    render() {
        return (
            <Image style={styles.image} source={this._getImage(this.props.filename) } resizeMode = 'cover' />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        height: null
    }
})