import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {InstantSearch} from 'react-instantsearch-native';
import RefinementList from '../containers/Search/RefinementList';
import {BackHeader} from '../components';
import AlgoliaPriceFilter from '../components/AlgoliaPriceFilter';
import {ScrollView} from 'react-native-gesture-handler';
import {   Text } from "../components";

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
});

const Filters = ({
  isModalOpen,
  searchState,
  searchClient,
  toggleModal,
  root,
  onSearchStateChange,
}) => (
  <Modal animationType="slide" visible={isModalOpen}>
    <SafeAreaView>
      <ScrollView>
        <BackHeader
          title="Filter & Sort"
          goBack={toggleModal}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                // resetFilter()
                // resetSort()
              }}>
              <Text>delete all</Text>
            </TouchableOpacity>
          }
        />
        {/* <InstantSearch
            searchClient={searchClient}
            indexName="clothes"
            root={root}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}> */}
        {/* <InstantSearch
          searchClient={searchClient}
          indexName="clothes"
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}>
             */}
        <AlgoliaPriceFilter attribute="price" />
        <RefinementList operator="and" title="Brand" attribute="brand_name" />
        <RefinementList operator="and" title="Color" attribute="color" />
        <RefinementList operator="and" title="Material" attribute="material" />
        <RefinementList
          operator="and"
          title="Condition"
          attribute="condition"
        />
        {/* <RefinementList attribute="brand" /> */}
        {/* </InstantSearch> */}
        {/* </InstantSearch> */}
      </ScrollView>
    </SafeAreaView>
  </Modal>
);

Filters.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  searchState: PropTypes.object.isRequired,
  searchClient: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;
