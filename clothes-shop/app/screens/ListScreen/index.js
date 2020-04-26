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
  import ListScreen from './ListScreen';
  import _ from 'lodash';
  
  const enhance = compose(
    withProps(({navigation}) => ({
        Component: navigation.getParam('Component', null), 
        ListComponent: navigation.getParam('ListComponent', null),
        items: navigation.getParam('items', []),
        title: navigation.getParam('title', []),
    })),
  );
  
  export default enhance(ListScreen);
  