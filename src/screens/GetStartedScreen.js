import React from 'react'
import { View, Modal } from 'react-native'
import GetStartedView from '../../app/views/GetStartedView'
import FeedList from '../components/FeedList'
import { NavigationActions } from 'react-navigation'
import { AppLoading, Font } from 'expo'

import CameraStackNavigator from '../../src/navigation/CameraStackNavigator';

const feedScreenAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'FeedScreen' })
    ]
})

const cameraScreenAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'CameraScreen' })
    ]
})

export default class GetStartedScreen extends React.Component {

    static navigationOptions = { header: null }

    state = {
        isReady: false,
        cameraModalVisible: false
    }

    componentWillMount() {

    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <View style={{flex: 1}}>
                <GetStartedView gotToView={this.goToView.bind(this)}/>
                <Modal
                    visible={this.state.cameraModalVisible}
                    animationType={'slide'}>
                    <CameraStackNavigator style={{ flex: 1 }} screenProps={{
                        onClose: this._handleModalClose.bind(this)
                    }} />
                </Modal>
            </View>
        )
    }

    goToView(viewName) {
        if (viewName === 'Camera') {
            this.setState({cameraModalVisible: true})
        } else if (viewName === 'Feed') {
            this.props.navigation.dispatch(feedScreenAction)
        }
    }

    _handleModalClose() {
        this.setState({ cameraModalVisible: false })
    }

    async _cacheResourcesAsync() {
        return Font.loadAsync({
            'Avenir-Heavy-Oblique': require('../assets/fonts/Avenir-HeavyOblique.otf'),
            'Carosello': require('../assets/fonts/Carosello-Regular.ttf'),
        });
    }
}