import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import algoliasearch from 'algoliasearch';
import {InstantSearch, connectRefinementList} from 'react-instantsearch-native';
import SearchBox from '../containers/SearchBox';
import InfiniteHits from '../components/InfiniteHits';
import Filters from '../components/Filters';
// import SearchHeader from "../components/SearchHeader";
// import ProductListItem from '../components/ProductListItem'
// import colors from '../styles/colors'
// import i18n from '../i18n';
// import algoliasearch from 'algoliasearch/reactnative';

const searchClient = algoliasearch();
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

export default class SearchScreen extends Component {
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

  // search = (text) => {
  //     console.log('seach this text - ',text);
  //     this.setState({
  //         searching : true
  //     })
  //     index
  //         .search(text)
  //         .then(({ hits }) => {
  //             this.setState({
  //                 searchItems : hits,
  //                 searching : false
  //             })
  //         })
  //         .catch(err => {
  //             this.setState({
  //                 searching : false
  //             })
  //             console.log(err);
  //         });
  // }

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
    const {isModalOpen, searchState} = this.state;
    const {searchItems} = this.state;
    const {
      toWishlist,
      fromWishlist,
      fromCart,
      toCart,
      isInWishlist,
      isInCart,
      cartItems,
      wishlist,
      openProductInfo,
    } = this.props;
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          {/* <InstantSearch
            searchClient={searchClient}
            indexName="parts"
            root={this.root}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}> */}
          {/* <VirtualRefinementList attribute="category_id" /> */}
          {/* <Filters
                        isModalOpen={isModalOpen}
                        searchClient={searchClient}
                        searchState={searchState}
                        toggleModal={this.toggleModal}
                        onSearchStateChange={this.onSearchStateChange}
                        /> */}
          {/* <SearchBox /> */}
          {/* <Button
                    title="Filters"
                    color="#252b33"
                    onPress={this.toggleModal}
                    /> */}
          {/* <InfiniteHits /> */}
          {/* </InstantSearch> */}
        </View>
      </SafeAreaView>
      // <View style={{flex:1, backgroundColor : colors.gray}}>
      //     <SearchHeader
      //         search={this.state.searchText}
      //         showBack
      //         updateSearch={(searchText) =>
      //             this.setState({
      //                 searchText
      //             })
      //         }
      //         onBack={() => this.props.navigation.goBack()}
      //         />
      //     { this.state.searching
      //         ? <ActivityIndicator />
      //         :
      //             this.state.searchText.length > 0
      //             && this.state.searchItems.length == 0
      //             && <Text style={{textAlign : "center", marginVertical: 15}}>{i18n.t('searchnotfound')}</Text>
      //     }
      //     <FlatList
      //         data={searchItems}
      //         renderItem={({item}) => (
      //             <ProductListItem
      //                 toWishlist={toWishlist}
      //                 fromWishlist={fromWishlist}
      //                 fromCart={fromCart}
      //                 toCart={toCart}
      //                 inWishlist={isInWishlist({wishlist, id: item.id})}
      //                 inCart={isInCart({cartItems, id: item.id})}
      //                 onPress={() => openProductInfo(item)}
      //                 {...item}
      //                 item={item}
      //                 />
      //              )}
      //         />
      // </View>
    );
  }
}
