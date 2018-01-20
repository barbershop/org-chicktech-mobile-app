import React from 'react'
import GetStartedView from '../../app/views/GetStartedView'
import FeedList from '../components/FeedList'
import { NavigationActions } from 'react-navigation'
import { AppLoading, Font } from 'expo'

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
        isReady: false
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
        return (<GetStartedView gotToView={this.goToView.bind(this)}/>)
    }

    goToView(viewName) {
        if (viewName === 'Camera') {
            this.props.navigation.dispatch(cameraScreenAction)
        } else if (viewName === 'Feed') {
            this.props.navigation.dispatch(feedScreenAction)
        }
    }

    async _cacheResourcesAsync() {
        return Font.loadAsync({
            'Avenir-Heavy-Oblique': require('../assets/fonts/Avenir-HeavyOblique.otf'),
            'Carosello': require('../assets/fonts/Carosello-Regular.ttf'),
        });
    }
}