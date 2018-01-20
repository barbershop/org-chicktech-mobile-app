import React from 'react';
import { View, Text, Alert } from 'react-native'
import { BackgroundImage, TitleText, StartButton, Styles } from '../../src/components'

export default class GetStartedView extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TitleText>Hello World</TitleText>
                <StartButton onPress={() => { }} style={styles.startButton}>
                    <Text style={styles.startButtonText}></Text>
                </StartButton>
            </View>
        )
    }

    onPressStartButton() {
        // this.props.gotToView('Camera')
        Alert.alert('Button Pressed!')
    }
}

const styles = Styles({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    titleText: {
        color: 'hotpink',
        fontSize: 60,
        top: 95
    },
    startButton: {
        backgroundColor: 'black',
        height: 50,
    },
    startButtonText: {
        color: 'white'
    }
})
