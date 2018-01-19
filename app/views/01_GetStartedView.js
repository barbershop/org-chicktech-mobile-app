import React from 'react';
import { View } from 'react-native'
import { BackgroundImage, StartButton, Styles } from '../../src/components'

export default GetStartedView = (goToNextScreen) => {
    /***
    
    FUNCTIONS: 

    goToNextScreen - Navigates to the next screen

    ***/

    return (
        /* START: LESSON 1.0 */
        <View style={styles.container}>
            <BackgroundImage filename="background-image.png" />
            <StartButton onPress={ goToNextScreen } style={styles.startButton}>GET STARTED</StartButton>
        </View>
        /* END: LESSON 1.0 */
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
