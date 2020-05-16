import {
    compose,
    withProps,
    withState,
    withHandlers,
    lifecycle,
  } from 'recompose';
  import {
    Alert
  } from 'react-native';
  import GridScreen from './GridScreen';
  import _ from 'lodash';
  
  const enhance = compose(
    withProps(({navigation}) => ({
        items: navigation.getParam('items', []),
        title: navigation.getParam('title', []),
        listProps: navigation.getParam('listProps', {}),
    })),
  );
  
  export default enhance(GridScreen);
  