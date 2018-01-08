import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import StickerList from '../components/StickerList';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var stickerData = [
    {
        id: 0,
        image: {
            uri: 'http://via.placeholder.com/100x100'
        }
    },
    {
        id: 1,
        image: {
            uri: 'http://via.placeholder.com/100x100'
        },
    },
    {
        id: 2,
        image: {
            uri: 'http://via.placeholder.com/100x100'
        }
    }
]

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
                        style={styles.photo}
                        source={{ uri: state.params.photo.uri }}
                    />
                </View>
                <View style={styles.stickersBottom}>
                    <View style={styles.stickerListContainer}>
                        <StickerList style={styles.stickerList} data={stickerData} />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={this._handleSave}>
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _handleCloseButtonPress = () => {
        console.log('CLOSE');
    }

    _handleSave = () => {
        console.log('SAVE');
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
    photo: {
        flex: 1
    },
    stickerListContainer: {
        backgroundColor: '#000',
        height: 104,
        width: screenWidth
    },
    stickerList: {
        flex: 1
    },
    saveButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff'
    }
});

export default FeedScreen;