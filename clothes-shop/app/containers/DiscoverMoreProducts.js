import React from 'react';
import {View, Text} from 'react-native';
import ProductProvider from './ProductProvider';
import HorizontalItemList from '../components/HorizontalItemList';

const DiscoverMoreProducts = ({
  product_ids,
  collection,
  onLoaded,
  ...props
}) => {
  return (
    <ProductProvider
      collection={collection}
      onLoaded={onLoaded}
      product_ids={product_ids}
      render={items => (
        <HorizontalItemList {...props} title="Discover more" items={items} />
      )}>
      {/* {(items) => (<HorizontalItemList
                    {...props}
                    title="Discover more"
                    items={items}
                    />)

            } */}
    </ProductProvider>
  );
};

export default DiscoverMoreProducts;
