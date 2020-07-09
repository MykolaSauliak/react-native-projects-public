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
import { withLists } from '../../features/lists';
  
  const enhance = compose(
    withLists(),
    withProps(({navigation}) => ({
        Component: navigation.getParam('Component', null), 
        ListComponent: navigation.getParam('ListComponent', null),
        items: navigation.getParam('items', []),
        headerProps: navigation.getParam('headerProps', {}),
        title: navigation.getParam('title', []),
        listName: navigation.getParam('listName', null),
    })),
  );
  
  export default enhance(ListScreen);
  