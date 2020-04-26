import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import T from 'prop-types';

export default class HorizontalFilter extends Component {
  state = {
    selectedFilters: [],
  };

  toggleItem = filterValue => {
    const {selectedFilters = []} = this.state;
    const {
      onStateChange,
      onFilter,
      items,
      filterField,
      // multiple
    } = this.props;

    if (selectedFilters.includes(filterValue)) {
      this.setState({
        selectedFilters: this.state.selectedFilters.filter(
          f => f != filterValue,
        ),
      });
      const newFilters = this.state.selectedFilters.filter(
        f => f != filterValue,
      );
      if (onStateChange) {
        onStateChange(newFilters);
      }
      if (onFilter) {
        onFilter(
          items.filter(i => {
            if (newFilters.length == 0 || newFilters.includes(i[filterField])) {
              return true;
            }
            return false;
          }),
        );
      }
    } else {
      this.setState({
        selectedFilters: [
          ...this.state.selectedFilters.filter(f => f != filterValue),
          filterValue,
        ],
      });
      const newFilters = [
        ...this.state.selectedFilters.filter(f => f != filterValue),
        filterValue,
      ];

      if (onStateChange) {
        onStateChange(newFilters);
      }
      if (onFilter) {
        onFilter(
          items.filter(i => {
            if (newFilters.length == 0 || newFilters.includes(i[filterField])) {
              return true;
            }
            return false;
          }),
        );
      }
    }
  };

  _renderItem = item => {
    // console.log('item',item.filterValue)
    return (
      <TouchableOpacity
        style={{margin: 5, backgroundColor: 'white'}}
        onPress={() => this.toggleItem(item.filterValue)}>
        <Image
          resizeMode="contain"
          style={{
            borderRadius: 20,
            borderWidth: 2,
            borderColor: this.state.selectedFilters.includes(item.filterValue)
              ? 'green'
              : null,
            width: 75,
            height: 40,
          }}
          source={{uri: item.image}}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      items = [
        /**
         * key
         */
      ],
      filterField,
      imageField,
      containerStyles = {},
    } = this.props;

    let keys = [];
    let filterValues = [];
    items.forEach(i => {
      if (!filterValues.includes(i[filterField])) {
        keys.push({image: i[imageField].src, filterValue: i[filterField]});
        filterValues.push(i[filterField]);
      }
    });
    // { image : i[0] ? i[0][imageField] : i[imageField], filterValue : i[filterField]})

    return (
      <View style={[{maxHeight: 75, padding: 10}, containerStyles]}>
        <FlatList
          horizontal={true}
          data={keys}
          // keyExtractor={(}
          renderItem={({item, index}) => this._renderItem(item)}
        />
      </View>
    );
  }
}

HorizontalFilter.propTypes = {
  items: T.array,
  onStateChange: T.func,
  onFilter: T.func,
  multiple: T.bool,
  containerStyles: T.object,
};
