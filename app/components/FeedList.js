// @flow

import React from 'react';
import {
    FlatList,
    StyleSheet
} from 'react-native';
import FeedListItem from './FeedListItem';

export default class FeedList extends React.PureComponent {
    state = { selected: (new Map(): Map<string, boolean>) };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id: string) => {

    };

    _renderItem = ({ item }) => (
        <FeedListItem
            id={item.id}
            key={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            image={item.image}
        />
    );

    render() {
        console.log(`RENDER FEED LIST: ${this.props.data.length}`);
        return (
            <FlatList
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