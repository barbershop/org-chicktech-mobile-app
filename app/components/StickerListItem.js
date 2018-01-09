import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class StickerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        console.log('RENDER FEED LIST ITEM');
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>
                <View style={styles.containerView}>
                    <Image
                        style={styles.image}
                        source={this.props.image.path}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#fff',
        height: 100,
        width: 100
    },
    containerView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: 104,
        width: 104,
        paddingVertical: 2,
        paddingLeft: 2,
    }
});