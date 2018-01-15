// @flow

import React from 'react';
import {
    FlatList,
    StyleSheet
} from 'react-native';
import StickerListItem from './StickerListItem';

export default class StickerList extends React.PureComponent {
    state = { selected: (new Map(): Map<string, boolean>) };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <StickerListItem
            id={item.id}
            key={item.id}
            onPressItem={this.props.onPressStickerListItem}
            selected={!!this.state.selected.get(item.id)}
            image={item.image}
        />
    );

    render() {
        console.log(`RENDER FEED LIST: ${this.props.data.length}`);
        return (
            <FlatList
                horizontal={true}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                style={styles.list}
            />
        );
    }
}

const styles = StyleSheet.create({

});