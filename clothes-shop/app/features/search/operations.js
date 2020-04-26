import ShopService from '../../services';
import {getCartitems} from './selectors';
import {setCartItems, setCount, setCartLoading} from './actions';

export const updateInfo = () => async (dispatch, getState) => {
  // //console.log('updateInfo for cart ...')
  let cartItems = getCartitems(getState());
  // //console.log('cartItems',cartItems)
  // dispatch(setCartItems([]))
  // if(typeof cartItems != 'array'){
  //     return
  // }
  cartItems = cartItems.filter(c => c.id && c);
  // //console.log('cartItems updateInfo - ',cartItems)
  // //console.log('componentDidUpdate cartItems',cartItems)
  if (cartItems.length == 0) {
    return;
  }
  dispatch(setCartLoading(true));
  const promises = cartItems.map(item => {
    return new Promise(resolve => {
      Shop.getGood(item.id)
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
  products = products.filter(p => p != null);
  // //console.log('products updated -',products)
  dispatch(setCartItems(products));
  dispatch(setCartLoading(false));

  // this.props.setProducts(products);
};

export const getTotalValue = cartItems => {
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
  return sum;
};
