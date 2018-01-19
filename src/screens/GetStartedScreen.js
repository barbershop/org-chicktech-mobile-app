import React from 'react'
import GetStartedView from '../../app/views/01_GetStartedView'
import FeedList from '../components/FeedList'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'FeedScreen' })
    ]
})

class GetStartedScreen extends React.Component {

    static navigationOptions = { header: null }

    render() {
        return GetStartedView(this.goToNextScreen.bind(this))
    }

    goToNextScreen() {
        this.props.navigation.dispatch(resetAction)
    }
}

export default GetStartedScreen