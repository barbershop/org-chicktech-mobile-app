import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CameraComponent, Styles } from '../../src/components'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

export const CameraHeader = {
    title: 'CAMERA'
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
                        <TouchableOpacity style={styles.cameraButton} onPress={() => { this.takePicture() }} />
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
        borderTopColor: '#000',
        height: screenHeight / 2,
        width: screenWidth
    },
    cameraButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        borderRadius: 100 / 2,
    },
    cameraButton: {
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        borderColor: '#000',
        borderWidth: 4
    },
})