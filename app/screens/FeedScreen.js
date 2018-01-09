import React from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';
import FeedList from '../components/FeedList';

import {
    StackNavigator,
} from 'react-navigation';

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
        feedData: []
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleCamera: this._handleCameraButtonPress });
        this._setupMediaListener();
    }

    render() {
        console.log(`FEED DATA: ${this.state.feedData}`)
        return (
            <FeedList style={styles.feedList} data={this.state.feedData} />
        )
    }

    _handleCameraButtonPress = () => {
        this.props.navigation.navigate('CameraScreen');
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
            this.setState({ feedData: mappedMedia });
        });
    }
}

const styles = StyleSheet.create({

});