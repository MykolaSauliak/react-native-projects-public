import {compose, withProps} from 'recompose';
import ProductCard from '../components/ProductCard/ProductCard';
import {withFavorite} from '../utils/enhancers';
import {NavigationService} from '../services';
import constants from '../constants';

const enhance = compose(
  withFavorite({listName: constants.clothes}),
  withProps(({isFavorite, toggleFavorite, id}) => ({
    // onPress: (item) =>  NavigationService.navigateToProduct(item),
    favorite: isFavorite({id}),
    onFavoriteToggle: ({item, id}) => toggleFavorite({item, id}),
  })),
);

export default enhance(ProductCard);
