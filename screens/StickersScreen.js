import React from 'react';
import {
    Text,
    View,
    Image,
    Button,
    Dimensions,
    StyleSheet
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height; 

class FeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'STICKERS',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#FC508B' },
            headerTitleStyle: { color: '#fff' },
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleClose: this._handleCloseButtonPress })
    }

    render() {
        const { state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.stickersTop}>
                    <Image
                        style={styles.image}
                        source={{ uri: state.params.photo.uri }}
                    />
                </View>
                <View style={styles.stickersBottom}/>
            </View>
        )
    }

    _handleCloseButtonPress = () => {
        console.log('CLOSE');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickersTop: {
        height: screenHeight / 2,
        width: screenWidth
    },
    stickersBottom: {
        backgroundColor: '#FC508B',
        height: screenHeight / 2,
        width: screenWidth
    },
    image: {
        flex: 1
    }
});

export default FeedScreen;