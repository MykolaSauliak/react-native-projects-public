import AddShippingAddressScreenView from './AddShippingAddressScreenView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import ShopService from '../../services';
import screens from '../../constants/screens';
import {
  addShippingAddress,
  updateAddress
} from '../../features/shippingaddress/actions';
import {connect} from 'react-redux';
import {
  getSelectedAddress,
  getAddresses,
  getLastAddressUpdate
} from '../../features/shippingaddress/selectors'; // import { getCartitems } from '../../features/cart/selectors'

const mapStateToProps = state => ({
  address: getSelectedAddress(state),
  addresses: getAddresses(state),
  lastUpdate: getLastAddressUpdate(state),
  // selectedModel : getSelectedModel(state),
});

const mapDispatchToProps = dispatch => ({
  addAddress: payload => dispatch(addShippingAddress(payload)),
  updateAddress: (id, update) => dispatch(updateAddress(id, update)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // withState('subcategories','setSubcategories',[]),
  withState('loading', 'setLoading', false),
  // withProps(props => ({
  //     subcategories : JSON.parse(props.navigation.getParam('subcategories',[]) || '[]')
  // })),
  withHandlers({
    onPress: ({navigation, dispatch}) => color => {
      dispatch(setSelectedSellColor(color));
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({dispatch, navigation}) => color => {
      // dispatch(setSelectedSellColor(color))
      navigation.navigate(screens.SelectSeller);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.goBack();
    },
  }),
  lifecycle({
    async componentDidMount() {
      // this.props.setLoading(true)
      // const category_id = this.props.navigation.getParam('category_id','')
      // const subcategories = await Shop.getSubcategories(category_id);
      // //console.log('categories',categories)
      // this.props.setSubcategories(subcategories);
      // this.props.setLoading(false)
    },
  }),
);

export default enhance(AddShippingAddressScreenView);
