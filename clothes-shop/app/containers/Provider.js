import React, {Component} from 'react';
import T from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import {ActivityIndicator} from '../components';

class Provider extends Component {
  state = {
    items: null,
    item: null,
    loading: false,
  };

  fetchProducts = async () => {
    if (!this.props.product_ids || this.props.product_ids.length == 0) {
      return;
    }
    const {collection, id, ids = []} = this.props;
    if (id) {
      this.setState(() => ({
        loading: true,
      }));
      firestore()
        .collection(collection)
        .doc(id)
        .get()
        .then(item => this.setState({item, loading: false}))
        .catch(err => {
          this.setState({loading: false});
        });
    } else {
      let items = [];
      this.setState(() => ({
        loading: true,
      }));
      let promises = ids.map(id => {
        return new Promise(resolve => {
          firestore()
            .collection(collection)
            .doc(id)
            .get()
            .then(product => resolve(product.data()))
            .catch(err => {
              console.log('ERROR', err);
              resolve();
            });
        });
      });
      Promise.all(promises).then(items => {
        this.setState(
          () => ({
            items,
            loading: false,
          }),
          () => {
            if (this.props.onLoaded) {
              this.props.onLoaded();
            }
          },
        );
      });
    }
  };

  async componentDidMount() {
    this.fetchProducts();
  }

  async componentDidUpdate(prepProps) {
    if (this.props.ids && !_.isEqual(prepProps.ids, this.props.ids)) {
      await this.fetchProducts();
    }
    if (this.props.id && !_.isEqual(prepProps.id, this.props.id)) {
      await this.fetchProducts();
    }
  }

  render() {
    const {items = [], loading} = this.state;

    if (loading) {
      return <ActivityIndicator />;
    }

    return this.props.render(item || items);
  }
}

Provider.propTypes = {
  render: T.func.isRequired,
  onLoaded: T.func,
};

export default Provider;
