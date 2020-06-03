import React from 'react';
import { 
    View, 
    Button 
} from "react-native";
import { BackHeaderCenter, Text } from '../../components';
import { Input } from 'react-native-elements';
import {
    connectRange, 
    connectHits
  } from 'react-instantsearch-native';
import _ from 'lodash'
import { withSearch } from '../../utils/enhancers';
import constants from '../../constants';

const RangeInput = ({
    min= 0,
    max=9999,
    containerStyle = {},
    refineLocal,
    searchState,
    setSearchState,
    onRefine,
}) => {

    let [localMin, setLocalMin] = React.useState("")
    let [localMax, setLocalMax] = React.useState("")
    let [minError, setMinError] = React.useState("")
    let [maxError, setMaxError] = React.useState("")

    return (
        <>
        <View style={[{flexDirection:'row'}, containerStyle]}>
            <View style={{flex:0.5, alignItems:'flex-start'}}>
                <Input
                    placeholder='Min'
                    value={localMin}
                    keyboardType="number-pad"
                    onChangeText={(text) => setLocalMin(text)}
                    errorMessage={minError}
                    // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />
                <Text style={{paddingLeft: 10}}>{`min: ${min} USD`}</Text>
            </View>
            <View style={{flex:0.5}}>
                <Input
                    placeholder='Max'
                    value={localMax}
                    keyboardType="number-pad"
                    onChangeText={(text) => setLocalMax(text)}
                    errorMessage={maxError}
                    // errorStyle={{}}
                    // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />
                <Text style={{paddingLeft: 10}}>{`max: ${max} USD`}</Text>
            </View>
        </View> 
        {(!_.isEmpty(localMin) || !_.isEmpty(localMax) ) && (<View style={{width: '100%',paddingHorizontal: 10}}>
            <Button 
                title="Apply" 
                onPress={() => {
                    const parseMax = parseFloat(localMax)
                    const parseMin = parseFloat(localMin)
                    console.log('parseMax',parseMax)
                    console.log('parseMin',parseMin)
                    if(parseMin<min){
                        setMinError("not correct value")
                        return 
                    }
                    if(parseMax>max){
                        setMaxError("not correct value")
                        return 
                    }
                    setMaxError("")
                    setMinError("")
                    setSearchState(refineLocal({price: {
                        min: parseMin || min,
                        max: parseMax || max,
                    }}, searchState))
                    if(onRefine){
                        onRefine()
                    }
                    // refine({
                    //     min: parseMin || min,
                    //     max: parseMax || max,
                    //     });
                }} 
                color="black" 
                />
        </View>)}
        </>
    );
};

export default withSearch(constants.clothes)(RangeInput);
