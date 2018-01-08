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
                        source={{ uri: this.props.image.uri }}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    containerView: {
        flex: 1,
        paddingVertical: 2,
        paddingLeft: 2,
    },
    container: {
        height: 104,
        width: 104
    }
});