import React from 'react';
import { View } from 'react-native'
import { BackgroundImage, StartButton, Styles } from '../../src/components'

/*

LESSON 01:

Functions:
    goToView(view) - Navigates to the next screen. view options are 'Camera' or 'Feed'

*/

export default GetStartedView = (goToView) => {
    return (
        <View style={styles.container}>
            <BackgroundImage filename="background-image.png" />
            <StartButton onPress={() => { goToView('Camera') }} style={styles.startButton}>GET STARTED</StartButton>
        </View>
    )
}

const styles = Styles({
    container: {
        flex: 1
    },
    startButton: {
        backgroundColor: '#000',
        borderRadius: 25,
        height: 50,
    }
})
