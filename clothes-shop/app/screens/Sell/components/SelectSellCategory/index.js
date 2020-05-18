import SelectSellCategoryView from './SelectSellCategoryView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import categories from '../../../../mockData/categories';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  withSell({pick: []}),
  withState('categories', 'setCategories', categories),
  withProps(props => ({
    // carmakes : props.navigation.getParam('carmakes',[]),
    // category : JSON.parse(props.navigation.getParam('category',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({
      setSellProduct,
      setSelectedSellCategory,
      navigation,
      dispatch,
    }) => category => {
      console.log('category',category)
      // setSellProduct({})
      setSelectedSellCategory(category);
      navigation.navigate(screens.SelectSellType);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
  }),
);

export default enhance(SelectSellCategoryView);
