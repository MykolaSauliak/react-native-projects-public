import Favorites from './Favorites';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import {
  withCart,
  withFavorite,
  withReduxLoading,
  withStateLoading,
} from '../../../utils/enhancers';
import constants from '../../../constants';
import {ShopService} from '../../../services';

// import categories from '../../mockData/categories'

const enhance = compose(
  withCart(),
  withStateLoading(),
  withFavorite({listName: constants.clothes}),
  withState('showEdit', 'setShowEdit', false),
  withState('items', 'setItems', []),
  withState('markedItems', 'setMarkedItems', []),
  withHandlers({
    toggleItemMark: ({markedItems, setMarkedItems}) => item => {
      let newMarkedItems = [];
      if (markedItems.filter(i => i.id == item.id).length > 0) {
        newMarkedItems = [...markedItems.filter(i => i.id != item.id)];
      } else {
        newMarkedItems = [...markedItems.filter(i => i != item.id), item];
      }
      setMarkedItems(newMarkedItems);
    },
    markedDelete: ({fromCart, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        fromCart(item);
      });
    },
    markedToCart: ({toCart, fromWishlist, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        toCart(item);
        fromWishlist(item);
      });
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      console.log('this.props.favorites', this.props.favorites);
      let items = await ShopService.getGoodsById(
        this.props.favorites.map(item => item.id),
      );
      this.props.setItems(items);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(Favorites);
