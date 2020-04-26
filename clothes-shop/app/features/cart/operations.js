// import ShopService from '../../services';
import {getCartitems} from './selectors';
import {setCartItems, setCount, setCartLoading} from './actions';
import {ShopService} from '../../services';
import constants from '../../constants';

const getAuthenticationFees = cartItems => {
  return cartItems.length * constants.authentication_fees;
};

const getTotalValue = cartItems => {
  let sum = 0;
  cartItems.forEach(i => {
    let price;
    if (i.discount > 0 && i.discountEndTs > Date.now() / 1000) {
      price = (i.count || 1) * (((100 - i.discount) / 100) * i.price);
    } else {
      price = (i.count || 1) * i.price;
    }
    sum += Number(price.toFixed(1));
  });
  //console.log('getTotalValue',sum)
  if (!sum) {
    return 0;
  }
  return sum;
};

const getTotalWithTaxes = cartItems => {
  let total = getTotalValue(cartItems);
  total += cartItems.length * constants.authentication_fees;
  return total;
};

export const updateCart = () => async (dispatch, getState) => {
  let cartItems = getCartitems(getState());
  // console.lg
  cartItems = cartItems.filter(c => c && c.id);
  console.log('cartItems updateInfo - ', cartItems);
  // //console.log('componentDidUpdate cartItems',cartItems)
  if (cartItems.length == 0) {
    return;
  }
  dispatch(setCartLoading(true));
  const promises = cartItems.map(item => {
    return new Promise(resolve => {
      ShopService.getGood(item.id)
        .then(product => {
          //console.log('product',item.id,product)
          // ifproduct){
          resolve({...item, ...product});
          // }else{
          //     resolve(null)
          // }
        })
        .catch(_ => {
          resolve(null);
        });
    });
  });
  //console.log('await all ...')
  /*
      TODO : Додати перевірку при оплаті, коли було
      останнє оновлення ціни
  */
  let products = [];
  try {
    products = await Promise.all(promises);
  } catch (err) {
    //console.log('ERROR DUTING UPDATE CART ITEMS -',err)
  }
  products = products.filter(p => p);
  // //console.log('products updated -',products)
  dispatch(setCartItems(products));
  dispatch(setCartLoading(false));
};

export {getTotalWithTaxes, getAuthenticationFees, getTotalValue};
