import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  // cartItems : {
  //   // "key" : count
  // },
  cartLoading: false,
  cartItems: [
    /*
    {
      id:string,
      marked:boolean,
      count:number,
    }
    */
  ],
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addToCart]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    return {
      ...state,
      cartItems: [
        ...state.cartItems.filter(obj => obj.id != payload.id),
        payload,
      ],
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.resetCart]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    return {...state, cartItems: []};
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.removeFromCart]: (state, {payload}) => {
    return {
      ...state,
      cartItems: [...state.cartItems.filter(obj => obj.id != payload)],
    };
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, cartLoading: payload};
  },
  // [types.removeFromCart]: (state, { payload }) => {
  //   let cartItems = state.cartItems
  //   delete cartItems[payload];
  //   return {...state, cartItems}
  // },
  [types.setCount]: (state, {payload: {id, count}}) => {
    // //console.log('set count ...',id,count);
    let cartItems = state.cartItems.map(c => {
      if (c.id == id) {
        c.count = count;
      }
      return c;
    });
    // let cartItems = {...state.cartItems, [id] : count}
    return {...state, cartItems};
  },
  [types.setCartItems]: (state, {payload}) => {
    return {...state, cartItems: payload};
  },
});
