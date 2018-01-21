import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CameraComponent, Button, Styles } from '../../src/components'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

export const CameraHeader = {
    title: 'CAMERA',
    headerRightButtonImage: require('../assets/buttons/close-button.png'),
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Avenir-Heavy-Oblique',
        fontSize: 20
    },
    headerStyle: {
        backgroundColor: '#FC508B',
        height: 60,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    }
}

export class CameraView extends React.PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <CameraComponent type="Front" />
                </View>
                <View style={styles.cameraBottom}>
                    <View style={styles.cameraButtonContainer}>
                        <Button style={styles.cameraButton} onPress={() => { this.takePicture() }} />
                    </View>
                </View>
            </View>
        )
    }

    takePicture() {
        this.props.takePicture()
    }
}

const styles = Styles({
    container: {
        flex: 1
    },
    cameraContainer: {
        height: screenHeight / 2,
        width: screenWidth
    },
    cameraBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC508B',
        borderTopWidth: 2,
        borderTopColor: 'black',
        height: screenHeight / 2,
        width: screenWidth
    },
    cameraButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    cameraButton: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 4
    },
})