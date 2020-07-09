import {compose, withProps} from 'recompose';
import PriceReductionProductCard from '../components/PriceReductionProductCard/PriceReductionProductCard'
import { ShopService } from '../services';
import {withLists} from '../features/lists'
import listnames from '../constants/listnames'

const enhance = compose(
  withLists(),
  withProps(({removeFromList, id}) => ({
    onPriceChange: async (price) => {
        let response = await ShopService.changePrice(id, price)
        removeFromList({listName: listnames.priceReduction, item: {id}})
      }   
  })),
);

export default enhance(PriceReductionProductCard);
