import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    CameraRoll,
    StyleSheet
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import Expo from 'expo';

import StickerList from '../../src/components/StickerList';
import Sticker from '../../src/components/Sticker';

import { StickersHeader, StickersView } from '../../app/views/StickersView'

import { uuid } from '../../src/helpers/utils';
import firebase from '../../src/helpers/firebase';
import stickerData from '../../app/assets/stickers';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class FeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerTitle:
                <Text style={StickersHeader.headerTitleStyle}>{StickersHeader.headerTitle}</Text>,
            headerLeft: StickersHeader.headerLeftButtonImage ?
                <TouchableOpacity style={{ height: 50, width: 50, padding: 8, marginLeft: 5 }} onPress={() => params.onPressBackButton()}>
                    <Image
                        style={{ flex: 1 }}
                        resizeMode='contain'
                        source={StickersHeader.headerLeftButtonImage}
                    />
                </TouchableOpacity> : null,
            headerRight: StickersHeader.headerRightButtonImage ?
                <TouchableOpacity style={{ height: 50, width: 50, padding: 8, marginRight: 5 }} onPress={() => params.onPressUndoButton()}>
                    <Image
                        style={{ flex: 1 }}
                        resizeMode='contain'
                        source={StickersHeader.headerRightButtonImage}
                    />
                </TouchableOpacity> : null,
            headerStyle: StickersHeader.headerStyle,
        }
    }

    state = {
        isSaving: false,
        stickers: []
    }

    componentDidMount() {
        this.props.navigation.setParams({ onPressBackButton: this._onPressBackButton });
        this.props.navigation.setParams({ onPressUndoButton: this._onPressUndoButton });
    }

    render() {
        console.log('STICKERS')
        const { state } = this.props.navigation;

        return (
            <StickersView ref="stickersView"
                stickerData={stickerData}
                photoSource={state.params.photo.uri}
                stickers={this.state.stickers}
                isSaving={this.state.isSaving}
                savePhoto={this._onPressSaveButton.bind(this)}
                addSticker={this._onPressStickerListItem.bind(this)}/>
        )
    }

    _onPressStickerListItem(id: string) {
        let stickers = this.state.stickers;
        this.setState({ stickers: [...stickers, stickerData[id]] });
    }

    _onPressBackButton = () => {
        this.props.navigation.goBack();
    }

    _onPressUndoButton = () => {
        let stickers = this.state.stickers;
        stickers.pop();
        this.setState({ stickers: stickers });
    }

    _onPressSaveButton = async (imageName) => {
        const { state } = this.props.navigation;

        this.setState({ isSaving: true });

        const name = `${uuid()}.jpg`;
        const body = new FormData();

        try {
            let result = await Expo.takeSnapshotAsync(this.refs.stickersView.refs.photoContainer, { format: 'jpg', result: 'file', quality: 1.0 });
            let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
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
                user: imageName
            });

            this.setState({ isSaving: false });
            this.props.screenProps.onClose();
        } catch (error) {
            this.setState({ isSaving: false });
            console.error(error);
        }
    }
}

export default FeedScreen;