import BrandChoose from './BrandChoose';
import {compose, withProps, withHandlers, withState} from 'recompose';
import {withSell} from '../../utils/enhancers';
import brands from '../../mockData/brands';
import {NavigationService} from '../../services';
import constants from '../../constants';
const uuidv4 = require('uuid/v4');

const enhance = compose(
  withSell({pick: [
    constants.brand,
    constants.category,
    constants.type,
    constants.subtype,
  ]}),
  withState('searchText', 'setSearchText', ''),
  withState('brands', 'setBrands', brands),
  withProps(props => ({
    onPress : props.navigation.getParam('onPress',() => {}),
  })),
  withHandlers({
  }),
);

export default enhance(BrandChoose);
