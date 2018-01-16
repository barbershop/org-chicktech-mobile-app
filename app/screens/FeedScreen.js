import React from 'react';
import {
    Text,
    View,
    Button,
    Modal,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import FeedList from '../components/FeedList';
import CameraStackNavigator from '../navigation/CameraStackNavigator';

import firebase from '../../helpers/firebase';

export default class FeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerTitle: <Text style={{ color: '#fff', fontFamily: 'Avenir', fontWeight: '900', fontStyle: 'italic', fontSize: 20 }}>FEED</Text>,
            headerRight: <TouchableOpacity style={{ height: 50, width: 50, padding: 8, marginRight: 5 }} onPress={() => params.handleCamera()}>
                        <Image
                            style={{ flex: 1 }}
                            resizeMode='contain'
                            source={require('../assets/camera-button.png')}
                        />
            </TouchableOpacity>,
            headerStyle: { backgroundColor: '#FC508B', height: 62, borderBottomColor: '#000', borderBottomWidth: 2 }
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
                <Modal
                    visible={this.state.cameraModalVisible}
                    animationType={'slide'}>
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