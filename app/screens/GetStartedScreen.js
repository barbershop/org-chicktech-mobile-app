import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Image,
    StyleSheet
} from 'react-native';
import FeedList from '../components/FeedList';
import { NavigationActions } from 'react-navigation';
import CameraStackNavigator from '../navigation/CameraStackNavigator';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'FeedScreen' })
    ]
})

import firebase from '../../helpers/firebase';

class GetStartedScreen extends React.Component {

    static navigationOptions = { header: null };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={styles.backgroundImage} source={require('../assets/splash.png')} resizeMode='cover'/>
                <TouchableHighlight style={styles.getStartedButton} underlayColor='#FC508B' onPress={ () => this._onPressGetStarted() }>
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _onPressGetStarted() {
        this.props.navigation.dispatch(resetAction);
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    getStartedButton: {
        backgroundColor: '#000',
        borderRadius: 25,
        bottom: 30,
        left: '10%',
        height: 50,
        position: 'absolute',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    getStartedText: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontWeight: '900',
        fontStyle: 'italic',
        fontSize: 20
    }
});

export default GetStartedScreen;