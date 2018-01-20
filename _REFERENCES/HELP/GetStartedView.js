import React from 'react';
import { View, Text, Alert } from 'react-native'
import { BackgroundImage, TitleText, StartButton, Styles } from '../../src/components'

export default class GetStartedView extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage filename="background-image.png" />
                <TitleText style={styles.titleText}>Sticker Pics</TitleText>
                <StartButton onPress={() => this.onPressStartButton()} style={styles.startButton}>
                    <Text style={styles.startButtonText}>GET STARTED</Text>
                </StartButton>
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
        flex: 1
    },
    titleText: {
        color: 'hotpink',
        fontFamily: 'Carosello',
        fontSize: 60,
        top: 95
    },
    startButton: {
        backgroundColor: 'black',
        borderRadius: 25,
        height: 50,
    },
    startButtonText: {
        color: 'white',
        fontFamily: 'Avenir-Heavy-Oblique',
        fontSize: 20
    }
})
