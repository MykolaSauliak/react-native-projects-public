import React, {Component} from 'react';
import {View, Text} from 'react-native';
import T from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import {ActivityIndicator} from '../components';

class ProductProvider extends Component {
  state = {
    products: null,
    loading: false,
  };

  fetchProducts = async () => {
    if (!this.props.product_ids || this.props.product_ids.length == 0) {
      return;
    }
    const {collection = 'clothes', product_ids = []} = this.props;
    let products = [];
    this.setState(() => ({
      loading: true,
    }));
    console.log('product_ids', product_ids);
    let promises = product_ids.map(id => {
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
    products = await Promise.all(promises);

    this.setState(
      () => ({
        products: products,
        loading: false,
      }),
      () => {
        if (this.props.onLoaded) {
          console.log('onLoaded');
          console.log('products', products);
          this.props.onLoaded();
        }
      },
    );
  };

  async componentDidMount() {
    this.fetchProducts();
  }

  async componentDidUpdate(prepProps) {
    console.log(
      'prepProps.similar_items, this.props.similar_items',
      prepProps.product_ids,
      this.props.product_ids,
    );
    if (
      !_.isEqual(
        prepProps.product_ids,
        this.props.product_ids && this.props.product_ids,
      )
    ) {
      await this.fetchProducts();
    }
  }

  render() {
    const {products = [], loading} = this.state;
    let Children = this.props.children;

    if (loading) {
      return <ActivityIndicator />;
    }

    if (this.props.render) {
      return this.props.render(products);
    }

    if (_.isFunction(Children)) {
      // console.log("is function")
      return this.props.children(products);
    }
    return (
      <>{products && products.map(product => <Children {...product} />)}</>
    );
  }
}

ProductProvider.propTypes = {
  children: T.func,
};

export default ProductProvider;
