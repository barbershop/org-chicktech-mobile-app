import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Camera, Permissions, Font } from 'expo'
import { CameraHeader, CameraView } from '../../app/views/CameraView'
import { NavigationActions } from 'react-navigation'

var screenWidth = Dimensions.get('window').width 
var screenHeight = Dimensions.get('window').height 

const getStartedScreenAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'GetStartedScreen' })
    ]
})

export default class CameraScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerTitle: <Text style={CameraHeader.headerTitleStyle}>{CameraHeader.title}</Text>,
            headerStyle: CameraHeader.headerStyle,
            headerRight: CameraHeader.headerRightButtonImage ? 
                <TouchableOpacity style={{ height: 50, width: 50, padding: 8, marginRight: 5 }} onPress={() => params.handleCloseCamera()}>
                    <Image
                        style={{ flex: 1 }}
                        resizeMode='contain'
                        source={CameraHeader.headerRightButtonImage}
                    />
                </TouchableOpacity> : null
        }
    }

    state = {
        hasCameraPermission: null
    }

    async componentWillMount() {
        this.props.navigation.setParams({ handleCloseCamera: this._handleCloseCamera })
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return <CameraView takePicture={this._takePicture.bind(this)} onPressClose={this._handleCloseCamera.bind(this)} ref="cameraView" />
        }
    }

    _takePicture = async () => {
        if (this.refs.cameraView.refs.cameraComponent.refs.camera) {
            let photo = await this.refs.cameraView.refs.cameraComponent.refs.camera.takePictureAsync()
            this.props.navigation.navigate('StickersScreen', { photo: photo })
        }
    }

    _handleCloseCamera = () => {
        if (this.props.screenProps && this.props.screenProps.onClose) {
            this.props.screenProps.onClose()
        } else {
            this.props.navigation.dispatch(getStartedScreenAction)
        }
    }
}