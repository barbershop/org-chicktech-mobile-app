import React from 'react'
import GetStartedView from '../../app/views/GetStartedView'
import FeedList from '../components/FeedList'
import { NavigationActions } from 'react-navigation'

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

    render() {
        return GetStartedView(this.goToView.bind(this))
    }

    goToView(viewName) {
        if (viewName === 'Camera') {
            this.props.navigation.dispatch(cameraScreenAction)
        } else if (viewName === 'Feed') {
            this.props.navigation.dispatch(feedScreenAction)
        }
    }
}