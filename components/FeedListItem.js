import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

export default class FeedListItem extends React.PureComponent {
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
    },
    container: {
        height: screenWidth
    }
});