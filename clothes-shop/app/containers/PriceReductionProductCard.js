import {compose, withProps} from 'recompose';
import PriceReductionProductCard from '../components/PriceReductionProductCard/PriceReductionProductCard'
import { ShopService } from '../services';

const enhance = compose(
  withProps(({id}) => ({
    onPriceChange: async (price) => {
        let response = await ShopService.changePrice(id, price)}   
  })),
);

export default enhance(PriceReductionProductCard);
