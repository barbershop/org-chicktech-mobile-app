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

import Expo from 'expo';

import StickerList from '../components/StickerList';
import Sticker from '../components/Sticker';

import { uuid } from '../helpers/utils';
import firebase from '../helpers/firebase';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var stickerData = [
    {
        id: 0,
        image: {
            path: require('../../assets/stickers/sticker-hat.png')
        }
    },
    {
        id: 1,
        image: {
            path: require('../../assets/stickers/sticker-hat.png')
        },
    },
    {
        id: 2,
        image: {
            path: require('../../assets/stickers/sticker-hat.png')
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

    state = {
        isSaving: false,
        stickers: []
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleClose: this._handleCloseButtonPress })
    }

    render() {
        const { state } = this.props.navigation;
        let stickerViews = []

        console.log("STICKERS COUNT: ", this.state.stickers.length);

        for (let i = 0; i < this.state.stickers.length; i++) {
            stickerViews.push(
                <Sticker
                    style={{ left: 0, top: 0, position: 'absolute', }}
                    id={`${i}`}
                    source={this.state.stickers[i].image.path}
                />
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.stickersTop} ref="photoContainer">
                    <Image
                        style={styles.photo}
                        source={{ uri: state.params.photo.uri }}
                    />
                    <View style={styles.stickersContainer}>
                        { stickerViews }
                    </View>
                </View>
                <View style={styles.stickersBottom}>
                    <View style={styles.stickerListContainer}>
                        <StickerList style={styles.stickerList} data={stickerData} onPressStickerListItem={this._handleStickerListItemPress.bind(this)} />
                    </View>
                    <TouchableOpacity style={[styles.saveButton, this.state.isSaving && styles.saveButtonSaving]} onPress={this._handleSave} disabled={this.state.isSaving}>
                        <Text style={styles.saveButtonText}>{this.state.isSaving ? 'SAVING...' : 'SAVE' }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _handleStickerListItemPress(id) {
        let stickers = this.state.stickers;
        this.setState({ stickers: [...stickers, stickerData[id]] });
    }

    _handleCloseButtonPress = () => {
        console.log('CLOSE');
    }

    _handleSave = async () => {
        const { state } = this.props.navigation;

        this.setState({ isSaving: true });

        const name = `${uuid()}.jpg`;
        const body = new FormData();

        try {
            let result = await Expo.takeSnapshotAsync(this.refs.photoContainer, { format: 'jpg', result: 'file', quality: 1.0 });
            body.append("picture", {
                uri: result,
                name,
                type: "image/jpg"
            });
        } catch (error) {
            this.setState({ isSaving: false });
            console.error(error);
        }

        try {
            const res = await fetch("https://us-central1-chicktech-sticker-pics.cloudfunctions.net/api/picture", {
                method: "POST",
                body,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            this.setState({ isSaving: false });
            console.error(error);
        }

        try {
            const url = await firebase.storage().ref(name).getDownloadURL();

            let mediaRef = firebase.database().ref('media');

            mediaRef.push().set({
                image: {
                    uri: url
                },
                userId: 'testuser'
            });

            this.setState({ isSaving: false });
            this.props.screenProps.onClose();
        } catch (error) {
            this.setState({ isSaving: false });
            console.error(error);
        }
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
    stickersContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
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
        flex: 1,
    },
    saveButton: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonSaving: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    saveButtonText: {
        color: '#fff'
    }
});

export default FeedScreen;