import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
//   import algoliasearch from 'algoliasearch';
import {InstantSearch, connectRefinementList} from 'react-instantsearch-native';
import InfiniteHits from '../../../../components/InfiniteHits';
import {  Text} from '../../../../components';
// import Filters from '../../components/Filters';
// const index = client.initIndex('parts');

const VirtualRefinementList = connectRefinementList(() => null);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default class MembersSearch extends Component {
  state = {
    searchItems: [],
    searchText: '',
    searching: false,
  };

  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  state = {
    isModalOpen: false,
    searchState: {},
  };

  toggleModal = () =>
    this.setState(({isModalOpen}) => ({
      isModalOpen: !isModalOpen,
    }));

  onSearchStateChange = searchState => {
    console.log('searchState', searchState);
    this.setState(() => ({
      searchState,
    }));
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  // _keyboardDidHide = () => {
  //    this.search(this.state.searchText)
  // }

  render() {
    const {
      searchClient, 
      searchState, 
      onSearchStateChange
    } = this.props;
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="members"
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        >
        <SafeAreaView style={styles.safe}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {/* <InstantSearch
              searchClient={searchClient}
              indexName="members"
              root={this.root}
              searchState={searchState}
              onSearchStateChange={onSearchStateChange}> */}
              {/* <VirtualRefinementList attribute="category_id" /> */}
              {/* <Filters
                          isModalOpen={isModalOpen}
                          searchClient={searchClient}
                          searchState={searchState}
                          toggleModal={this.toggleModal}
                          onSearchStateChange={this.onSearchStateChange}
                          /> */}
              {/* <Button
                      title="Filters"
                      color="#252b33"
                      onPress={this.toggleModal}
                      /> */}
              <InfiniteHits />
            {/* </InstantSearch> */}
          </View>
        </SafeAreaView>
      </InstantSearch>
    );
  }
}
