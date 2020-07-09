import React from 'react';
import DraftListItemComponent from '../components/DraftListItem';
import Swipeout from 'react-native-swipeout';
import { withSell } from '../utils/enhancers';

const DraftListItem = ({
    item,
    removeFromDrafts,
    ...otherProps
}) => {

    let swipeoutBtns = [
        {
          text: 'delete',
          backgroundColor: "red",
          type: "delete",
          onPress: () => removeFromDrafts(item?.id || item)
        }
      ]
    

    return (
        <Swipeout right={swipeoutBtns}>
            <DraftListItemComponent item={item} {...otherProps}/>
        </Swipeout>
    );
};

export default withSell()(DraftListItem);