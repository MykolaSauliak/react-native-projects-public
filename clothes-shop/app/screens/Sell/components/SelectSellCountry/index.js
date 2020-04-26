import SelectSellCountryView from './SelectSellCountryView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  // connect(mapStateToProps),
  withSell(),
  withState('searchText', 'setSearchText', ''),
  withState('countries', 'setCountries', [
    {id: 1, title: 'Afghanistan'},
    {id: 2, title: 'Albania'},
    {id: 3, title: 'Algeria'},
    {id: 4, title: 'Algeria'},
  ]),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({
      addDraft,
      setSelectedSellBrand,
      navigation,
      dispatch,
      category,
      type,
      subtype,
    }) => ({brand}) => {
      // setSelectedSellBrand(brand)
      // let newDraft = {
      //     id : Math.floor(Date.now() / 1000),
      //     brand,
      //     category,
      //     type,
      //     subtype
      // }
      // addDraft(newDraft)
      // setSellProduct(newDraft)
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      // navigation.navigate(screens.SelectSellMainSteps)
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
  }),
);

export default enhance(SelectSellCountryView);
