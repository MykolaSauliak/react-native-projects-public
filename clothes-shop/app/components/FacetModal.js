import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {InstantSearch} from 'react-instantsearch-native';
import RefinementList from '../containers/Search/RefinementList';
import algoliasearch from 'algoliasearch/lite';
import config from '../../config';

const searchClient = algoliasearch(
  config.ALGOLIA_APP_ID,
  config.ALGOLIA_SEARCH_ID,
);

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
});

const FacetModal = ({
  isModalOpen,
  searchState,
  toggleModal,
  onSearchStateChange,
  attribute,
  defaultRefinement = [],
}) => (
  <Modal animationType="slide" visible={isModalOpen}>
    <SafeAreaView>
      {/* <InstantSearch
        searchClient={searchClient}
        indexName="clothes"
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      > */}
      <RefinementList
        operator="and"
        attribute={attribute}
        defaultRefinement={defaultRefinement}
      />
      {/* <RefinementList attribute="brand" /> */}
      <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      {/* </InstantSearch> */}
    </SafeAreaView>
  </Modal>
);

FacetModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  searchState: PropTypes.object.isRequired,
  searchClient: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSearchStateChange: PropTypes.func.isRequired,
};

export default FacetModal;
