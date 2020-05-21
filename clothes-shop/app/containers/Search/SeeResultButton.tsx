import React from 'react';
import {
    connectStats,
} from 'react-instantsearch-native';
import {Button} from 'react-native-elements';
const pluralize = require('pluralize')

let ResultButton = ({ nbHits ,...props }) => {
    console.log('nbHits',nbHits)
    return <Button 
        {...props}
        containerStyle={{flex:1,height:'100%'}}
        buttonStyle={{backgroundColor:'black'}}
        title={`See ${nbHits } ${pluralize('result',nbHits )}`}
        titleStyle={{color:'white'}}
        />
}
  
export default connectStats (ResultButton);