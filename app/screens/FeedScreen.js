import React from 'react';
import {
    Text,
    View,
    Button,
    Modal,
    StyleSheet
} from 'react-native';
import FeedList from '../components/FeedList';
import CameraStackNavigator from '../navigation/CameraStackNavigator';

import firebase from '../helpers/firebase';

export default class FeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'FEED',
            headerRight: <Button color="#fff" title="Camera" onPress={() => params.handleCamera()} />,
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#FC508B' },
            headerTitleStyle: { color: '#fff' },
        }
    }

    state = {
        feedData: [],
        cameraModalVisible: false
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleCamera: this._handleCameraButtonPress });
        this._setupMediaListener();
    }

    render() {
        console.log(`FEED DATA: ${this.state.feedData}`)
        return (
            <View style={{flex: 1}}>
                <FeedList style={styles.feedList} data={this.state.feedData} />
                <Modal visible={this.state.cameraModalVisible}>
                    <CameraStackNavigator style={{ flex: 1 }} screenProps={{
                        onClose: this._handleModalClose
                    }} />
                </Modal>
            </View>
        )
    }

    _handleCameraButtonPress = () => {
        this.setState({ cameraModalVisible: true });
    }

    _handleModalClose = () => {
        this.setState({ cameraModalVisible: false });
    }

    _setupMediaListener() {
        firebase.database().ref('media').on('value', (snapshot) => {
            const media = snapshot.val();
            let mappedMedia = [];

            for (var key in media) {
                if (!media.hasOwnProperty(key)) continue;
                let item = media[key];
                item.id = key;
                mappedMedia.push(item);
            };

            console.log("FIREBASE MEDIA: ", mappedMedia);
            this.setState({ feedData: mappedMedia.reverse() });
        });
    }
}

const styles = StyleSheet.create({
    feedList: {
        flex: 1
    }
});