import React from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

export default class FeedListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <View style={styles.containerView}>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.image.uri }}
                />
                <View style={styles.userView}>
                    <Text style={styles.userText}>{this.props.user}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    containerView: {
        height: screenWidth
    },
    userView: {
        backgroundColor: '#000',
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    userText: {
        color: '#fff',
        fontFamily: 'Avenir-Heavy-Oblique',
        fontStyle: 'italic',
        fontSize: 14
    }
});