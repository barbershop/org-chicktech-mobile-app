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

var feedData = [
    {
        id: 0,
        image: {
            uri: 'http://via.placeholder.com/400x400'
        }
    },
    {
        id: 1,
        image: {
            uri: 'http://via.placeholder.com/400x400'
        },
    },
    {
        id: 2,
        image: {
            uri: 'http://via.placeholder.com/400x400'
        }
    }
]

class FeedScreen extends React.Component {
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

    componentDidMount() {
        this.props.navigation.setParams({ handleCamera: this._handleCameraButtonPress })
    }

    render() {
        console.log(`FEED DATA: ${feedData}`)
        return (
            <FeedList style={styles.feedList} data={feedData} />
        )
    }

    _handleCameraButtonPress = () => {
        this.props.navigation.navigate('CameraScreen');
    }
}

const styles = StyleSheet.create({

});

export default FeedScreen;