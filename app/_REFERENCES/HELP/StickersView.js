import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CameraComponent, StickerList, Sticker, Button, Styles } from '../../src/components'

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

export const StickersHeader = {
    title: '',
    headerLeftButtonImage: '',
    headerRightButtonImage: '',
    headerTitleStyle: {

    },
    headerStyle: {

    }
}

export class StickersView extends React.PureComponent {

    /*
        props:
            photoSource - The image source of the captured photo
            stickerData - An array of stickers found in the /assets/stickers directory
            stickers - An array of stickers that the user has selected
            isSaving - A boolean  (true or false value) that indicates whether the device is saving the photo
            addSticker(stickerId) - A function to add the slected sticker to the photo with the following parameters:
                stickerId - ID string of the selected sticker
            savePhoto(name) - A function to save the photo to the device with the following parameters:
                name - Text string to display on the photo
    */

    state = {
        isSaving: false
    }

    render() {
        let stickerViews = [];

        this.props.stickers.forEach((stickerView, i) => {
            stickerViews.push(
                <Sticker
                    id={`${i}`}
                    key={`${i}`}
                    source={this.props.stickers[i].image.path}
                />
            )
        })

        return (
            <View style={styles.container}>
                <View style={styles.stickersTop} ref="photoContainer">
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: this.props.photoSource }}
                    />
                    <View style={styles.stickersContainer}>
                        {stickerViews}
                    </View>
                </View>
                <View style={styles.stickersBottom}>
                    <View style={styles.stickerListContainer}>
                        <StickerList style={styles.stickerList} data={this.props.stickerData} onPressSticker={(stickerId) => { this.props.addSticker(stickerId) }} />
                    </View>
                    <TouchableOpacity style={[styles.saveButton, this.props.isSaving && styles.saveButtonSaving]} onPress={() => { this.props.savePhoto('ChickTech') }} disabled={this.props.isSaving}>
                        <Text style={styles.saveButtonText}>{this.props.isSaving ? 'SAVING...' : 'SAVE'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = Styles({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickersTop: {
        height: screenHeight / 2,
        width: screenWidth
    },
    stickersContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    stickersBottom: {
        backgroundColor: '#FC508B',
        flex: 1
    },
    stickerListContainer: {
        backgroundColor: '#000',
        height: 104,
        width: screenWidth
    },
    stickerList: {
        flex: 1
    },
    saveButton: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonSaving: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    saveButtonText: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontWeight: '900',
        fontStyle: 'italic',
        fontSize: 20
    }
})