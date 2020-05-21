import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  // cartItems : {
  //   // "key" : count
  // },
  price_reduce_ids: [],
  following_ids: [],
  loading: false,
  notifications: [
    /*
    {
    }
    */
  ],
  lastUpdate: null,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.subscribeToPriceReduce]: (state, {payload}) => {
    let price_reduce_ids = state.price_reduce_ids;
    price_reduce_ids = [...price_reduce_ids.filter(s => s != payload), payload];
    return {...state, price_reduce_ids, lastUpdate: Date.now()};
  },
  [types.unsubscribeToPriceReduce]: (state, {payload}) => {
    let price_reduce_ids = state.price_reduce_ids;
    price_reduce_ids = [...price_reduce_ids.filter(s => s != payload)];
    return {...state, price_reduce_ids, lastUpdate: Date.now()};
  },
  [types.addNotification]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    return {
      ...state,
      notifications: [
        ...state.notifications.filter(n => n.id != payload.id),
        payload,
      ],
      // notifications: [
      //   ...state.notifications.filter(obj => obj.id != payload.id),
      //   payload,
      // ],
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, loading: payload};
  },
  [types.removeAllNotification]: (state, {payload}) => {
    return {...state, notifications: []};
  },
  // [types.removeFromCart]: (state, { payload }) => {
  //   let cartItems = state.cartItems
  //   delete cartItems[payload];
  //   return {...state, cartItems}
  // },
  [types.setViewed]: (state, {payload: id}) => {
    // //console.log('set count ...',id,count);
    let notifications = state.notifications;
    notifications = notifications.map(c => {
      if (c.id == id) {
        c.viewed = true;
      }
      return c;
    });
    // let cartItems = {...state.cartItems, [id] : count}
    return {...state, notifications};
  },
  [types.setViewedAll]: (state, {payload: id}) => {
    // //console.log('set count ...',id,count);
    let notifications = state.notifications;
    notifications = notifications.map(c => ({...c,viewed : true}));
    // let cartItems = {...state.cartItems, [id] : count}
    return {...state, notifications};
  },
});

export {initialState};
