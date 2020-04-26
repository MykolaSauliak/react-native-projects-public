import SellView from './SellView';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import screens from '../../constants/screens';
import {
  withAuth,
  withSell,
  withWishlist,
  withCart,
} from '../../utils/enhancers';

const enhance = compose(
  withSell(),
  withAuth(),
  withWishlist(),
  withCart(),
  withState('showEdit', 'setShowEdit', false),
  withState('markedItems', 'setMarkedItems', []),
  withHandlers({
    openDraftInfo: ({setSellProduct, navigation, dispatch}) => item => {
      // //console.log('product', item)
      setSellProduct(item);
      navigation.navigate(
        screens.SelectSellMainSteps,
        // {
        //     ...item,
        //     item : JSON.stringify(item),
        //     // prevScreen: screens.WishlistStack,
        //     specs : JSON.stringify(item.specs),
        //     similar_parts : JSON.stringify(item.similar_parts),
        // }
      );
    },
    // toWishlist : ({dispatch}) => (id) => {
    //     dispatch(addToWishlist(id))
    // },
    // fromWishlist : ({dispatch}) => (id) => {
    //     dispatch(removeFromWishlist(id))
    // },
    // toCart : ({dispatch}) => (id) => {
    //     dispatch(addToCart(id))
    // },
    // fromCart : ({dispatch}) => (id) => {
    //     dispatch(removeFromCart(id))
    // },
    toggleItemMark: ({dispatch, markedItems, setMarkedItems}) => item => {
      let newMarkedItems = [];
      if (markedItems.filter(i => i.id == item.id).length > 0) {
        newMarkedItems = [...markedItems.filter(i => i.id != item.id)];
      } else {
        newMarkedItems = [...markedItems.filter(i => i.id != item.id), item];
      }
      console.log('newMarkedItems', newMarkedItems);
      setMarkedItems(newMarkedItems);
    },
    markedDelete: ({removeFromDrafts, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        removeFromDrafts(item.id || item);
      });
    },
    // markedToCart : ({addToCart,removeFromWishlist, markedItems, dispatch}) => () => {
    //     markedItems.forEach(item => {
    //         addToCart(item.id)
    //         removeFromWishlist(item.id)
    //     })
    // },
    openAddItemScreen: ({setSellProduct, navigation}) => () => {
      setSellProduct({});
      navigation.navigate(screens.SelectSellCategory);
    },
  }),
);

export default enhance(SellView);
