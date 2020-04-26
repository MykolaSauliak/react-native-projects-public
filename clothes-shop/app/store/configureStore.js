import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import Reactotron from '../ReactotronConfig';
// import sagaMiddleware from './middlewares';
import rootReducer from '../features';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['comments'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk),
      // applyMiddleware(sagaMiddleware),
      Reactotron.createEnhancer(),
    ),
  );
  // sagaMiddleware.run(rootSaga)
  let persistor = persistStore(store);
  return {store, persistor};
};
