import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';

var screenWidth = Dimensions.get('window').width; 
var screenHeight = Dimensions.get('window').height; 

export default class CameraScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'CAMERA',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#FC508B' },
            headerTitleStyle: { color: '#fff' },
        }
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.cameraContainer}>
                        <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref; }} />
                    </View>
                    <View style={styles.cameraBottom}>
                        <View style={styles.cameraButtonContainer}>
                            <TouchableOpacity style={styles.cameraButton} onPress={() => { this.takePicture() }} />
                            {/* <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                            flexDirection: 'row',
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 0.1,
                                                alignSelf: 'flex-end',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => {
                                                this.setState({
                                                    type: this.state.type === Camera.Constants.Type.back
                                                        ? Camera.Constants.Type.front
                                                        : Camera.Constants.Type.back,
                                                });
                                            }}>
                                            <Text
                                                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                                {' '}Flip{' '}
                                            </Text>
                                        </TouchableOpacity>
                                    </View> */}
                        </View>
                    </View>
                </View>
            );
        }
    }

    takePicture = async () => {
        console.log('TAKE PICTURE')
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.props.navigation.navigate('StickersScreen', { photo: photo });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraContainer: {
        height: screenHeight / 2,
        width: screenWidth
    },
    camera: {
        flex: 1
    },
    cameraBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC508B',
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
});