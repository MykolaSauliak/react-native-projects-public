// import ShopService from '../../services';
import {getCartitems} from './selectors';
import {setCartItems, setCount, setCartLoading} from './actions';
import {getUser} from '../user/selectors';
import {ShopService} from '../../services';
import constants from '../../constants';
import { Shop } from '../../types/Shop.type';
import _ from 'lodash';
import {round} from '../../utils/formatPrice'

type ProductWithCount  = Shop.Product &  {
    count : number
}

const getAuthenticationFees = (cartItems : ProductWithCount[] = []) => {
  let result = _.multiply(cartItems.length, constants.authentication_fees);
  return _.round(result, 2)
};

const discountValid = (item : ProductWithCount) => {
  return item.discount 
        && item.discountEndTs 
        && item.discount > 0 
        && item.discountEndTs > (Date.now() / 1000)
}

const getDiscountPrice = (item : ProductWithCount) => {
  return  _.multiply(((100 - (item.discount || 0)) / 100),item.price)
}

const getTotalValue = (cartItems : ProductWithCount[] =[]) => {
  let sum = 0;
  cartItems.forEach((i : ProductWithCount )=> {
    let cost = 0;
    if(_.isEmpty(i.count)){
      i.count  = 1
    }
    if (discountValid(i)) {
      cost = _.multiply((i.count),getDiscountPrice(i))
    } else {
      cost = _.multiply((i.count), i.price)
    }
    sum = sum + cost;
  });
  //console.log('getTotalValue',sum)
  // if (!sum) {
  //   return 0;
  // }
  return _.round(sum,2);
};

const getTotalWithTaxes = (cartItems:ProductWithCount[]) => {
  let total = getTotalValue(cartItems);
  total = total + getAuthenticationFees(cartItems)
  return round(total,2);
};

const getTotalWithTaxesFull = (cartItems:ProductWithCount[]) => {
  let total = getTotalValue(cartItems);
  total = total + getAuthenticationFees(cartItems)
  return round(total*100,0);
};

export const updateCart = () => async (dispatch : any, getState : any) => {
  let cartItems = getCartitems(getState());
  let user = getUser(getState());
  // console.lg
  cartItems = cartItems.filter((c: ProductWithCount) => c && c.id);
  // console.log('cartItems updateInfo - ', cartItems);
  if (cartItems.length == 0) {
    return;
  }
  dispatch(setCartLoading(true));
  const promises = cartItems.map((item  :ProductWithCount) => {
    return new Promise(resolve => {
      ShopService.getGoodWithNegotiations(item.id)
        .then(product => {
          resolve({...item, ...product});
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
  let products : ProductWithCount[] = [];
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

export {
  getTotalWithTaxes, 
  getAuthenticationFees, 
  getTotalValue,
  getTotalWithTaxesFull
};
