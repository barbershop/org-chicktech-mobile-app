import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';

var screenWidth = Dimensions.get('window').width; 
var screenHeight = Dimensions.get('window').height; 

export default class CameraScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerTitle: <Text style={{ color: '#fff', fontFamily: 'Avenir', fontWeight: '900', fontStyle: 'italic', fontSize: 20 }}>CAMERA</Text>,
            headerStyle: { backgroundColor: '#FC508B', height: 62, borderBottomColor: '#000', borderBottomWidth: 2 },
            headerRight: <TouchableOpacity style={{ height: 50, width: 50, padding: 8, marginRight: 5 }} onPress={() => params.handleCloseCamera()}>
                <Image
                    style={{ flex: 1 }}
                    resizeMode='contain'
                    source={require('../assets/buttons/close-button.png')}
                />
            </TouchableOpacity>
        }
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
    }

    async componentWillMount() {
        this.props.navigation.setParams({ handleCloseCamera: this._handleCloseCamera });
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
                            <TouchableOpacity style={styles.cameraButton} onPress={() => { this._takePicture() }} />
                        </View>
                    </View>
                </View>
            );
        }
    }

    _takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.props.navigation.navigate('StickersScreen', { photo: photo });
        }
    };

    _handleCloseCamera = () => {
        this.props.screenProps.onClose();
    }
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
});