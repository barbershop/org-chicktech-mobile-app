import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CameraComponent, Button, Styles } from '../../src/components'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

export const CameraHeader = {
    title: '',
    headerRightButtonImage: '',
    headerTitleStyle: {

    },
    headerStyle: {

    }
}

export class CameraView extends React.PureComponent {

    /*
        props:
            takePicture() - A function to take a photo and go to the next view
    */

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
    
}

const styles = Styles({
    container: {
        flex: 1
    },
    cameraContainer: {

    },
    cameraBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 80,
        height: 80,
    },
    cameraButton: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderColor: 'black',
        borderWidth: 4
    },
})