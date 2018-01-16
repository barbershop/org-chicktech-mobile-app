// @flow

import React from 'react';
import {
    FlatList,
    View,
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
            user={item.user}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => <View style={{ width: '100%', height: 3, backgroundColor: '#000' }}/> }
            />
        );
    }
}