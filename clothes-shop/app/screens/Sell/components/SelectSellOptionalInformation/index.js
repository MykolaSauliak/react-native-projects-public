import SelectSellOptionalInformationView from './SelectSellOptionalInformationView';
import {compose, withProps, withHandlers} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';
import { navigate } from '@storybook/addon-links/dist/preview';

const enhance = compose(
  withSell({pick: [
    constants.vintage, 
    constants.serialNumber, 
    constants.origin, 
    constants.proofOfOrigin, 
    constants.packaging, 
    constants.soldWith
  ]
  }),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
    },
    goToVintageChoose: ({navigation, dispatch}) => model => {
      navigation.navigate(screens.SelectSellVintage)
    },
    goToProofOfOriginChoose: ({navigation, dispatch}) => model => {
      navigation.navigate(screens.SelectSellProofOfOrigin)
    },
    goToOriginChoose: ({navigation, dispatch}) => model => {
      navigation.navigate(screens.SelectSellOrigin)
    },
    goToSerialNumberChoose: ({navigation, dispatch}) => model => {
      navigation.navigate(screens.SelectSellSerialNumber)
    },
    goToPackagingChoose: ({navigation, dispatch}) => model => {
      navigation.navigate(screens.SelectSellPackaging)
    },
  }),
);

export default enhance(SelectSellOptionalInformationView);
