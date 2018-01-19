import React from 'react'
import { Camera } from 'expo'

export default class CameraComponent extends React.PureComponent {

    _getCameraType(type) {
        switch(type) {
            case 'Front': return Camera.Constants.Type.front
            case 'Back': return Camera.Constants.Type.back
            default: break; 
        }
    }

    render() {
        return(
            <Camera style={{ flex: 1 }} type={this._getCameraType(this.props.type)} ref="camera" />
        )
    }
}