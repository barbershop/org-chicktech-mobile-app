import React from 'react';
import { View } from 'react-native'
import { FeedList } from '../../src/components'

export const FeedHeader = {
    title: 'FEED',
    headerRightButtonImage: '',
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Avenir-Heavy-Oblique',
        fontSize: 20
    },
    headerStyle: {
        backgroundColor: '#FC508B',
        height: 60,
        borderBottomColor: 'black',
        borderBottomWidth: 5
    }
}

export default class FeedView extends React.PureComponent {

    /*
        props:
            feedData - An array of photos from the online database
    */

    render() {
        return (
            <View style={styles.container}>
                
            </View>
        )
    }

    onPressStartButton() {
        this.props.gotToView('Camera')
        // Alert.alert('Button Pressed!')
    }
}

const styles = Styles({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    feedList: {
        flex: 1
    }
})
