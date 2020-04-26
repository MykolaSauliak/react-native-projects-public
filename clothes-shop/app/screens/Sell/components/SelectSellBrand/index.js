import SelectSellBrandView from './SelectSellBrandView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import {withSell} from '../../../../utils/enhancers';
import brands from '../../../../mockData/brands';
import {NavigationService} from '../../../../services';
const uuidv4 = require('uuid/v4');

const enhance = compose(
  withSell(),
  withState('searchText', 'setSearchText', ''),
  withState('brands', 'setBrands', brands),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({
      setSelectedSellBrand,
      setSellProduct,
      addDraft,
      category,
      type,
      subtype,
    }) => ({brand}) => {
      // dispatch(setSelectedSellBrand(brand))
      // console.log('setSelectedSellBrand',brand)
      // setSelectedSellBrand(brand)
      let newUuid = uuidv4();
      let newDraft = {
        id: newUuid,
        selectedSellBrand: brand,
        selectedSellCategory: category,
        selectedSellType: type,
        selectedSellSubtype: subtype,
        created_time: Date.now(),
      };
      console.log('onPress add new draft brand screen', newDraft);
      // try{
      addDraft(newDraft);
      setSellProduct(newDraft);
      // console.log('car_id',car_id)
      console.log('navigate to steps');
      NavigationService.navigateToSellSteps();
      // }catch(err){
      //     console.log(err)
      // }
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
    },
  }),
);

export default enhance(SelectSellBrandView);
