// there reducers can be stored
import {Platform, AsyncStorage} from 'react-native';
// import {all, fork} from 'redux-saga/effects';
// import AsyncStorage from '@react-native-community/async-storage';
import {persistCombineReducers} from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import lists from './lists';
import settings from './settings';
import score from './score';
import premium from './premium';
import wishlist from './wishlist';
import cart from './cart';
import comments from './comments';
import mycars from './mycars';
import following from './following';
import user from './user';
import seller from './seller';
import shippingaddress from './shippingaddress';
import search from './search';
import notifications from './notifications';
import favorite from './favorite';
import history from './history';
import filtersort from './filtersort';
import alerts from './alerts';

/** import sagas */
// import cartSaga from './cart/sagas';

const config = {
  key: 'root',
  whitelist: [
    'lists',
    'settings',
    'score',
    'premium',
    'wishlist',
    'cart',
    'mycars',
    'following',
    'user',
    'seller',
    'shippingaddress',
    'search',
    'favorite',
    'history',
    'notifications',
    'filtersort',
    'alerts',
  ],
  blacklist: ['comments'],
  storage: AsyncStorage,
};

const appReducer = {
  lists,
  settings,
  score,
  premium,
  wishlist,
  cart,
  mycars,
  user,
  comments,
  seller,
  shippingaddress,
  search,
  favorite,
  history,
  notifications,
  following,
  filtersort,
  alerts,
};

export default persistCombineReducers(config, appReducer);

// export function* rootSaga() {
//   yield all([
//     fork(cartSaga),
//   ]);
//  }
