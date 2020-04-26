import React, {useState, useEffect} from 'react';
import {connectRange} from 'react-instantsearch-native';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const RangeSlider = ({
  min,
  max,
  refine,
  currentRefinement,
  ...props
  // canRefine
}) => {
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([5]);
  const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);

  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = React.useState([min, max]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = values => setSliderOneValue(values);

  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  const nonCollidingMultiSliderValuesChange = values =>
    setNonCollidingMultiSliderValue(values);

  // if (!canRefine) {
  //   console.log('!canRefine')
  //   return null;
  // }

  // const domain = [min, max];
  // const [ticksValues, setTicksValues] = useState([
  //   currentRefinement.min,
  //   currentRefinement.max,
  // ]);

  const [localMin, setMin] = useState(min);
  const [localMax, setMax] = useState(max);

  const onChange = () => {
    console.log('localMin', nonCollidingMultiSliderValue);
    refine({
      min: nonCollidingMultiSliderValue[0],
      max: nonCollidingMultiSliderValue[1],
    });
  };

  return (
    <>
      <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
        <View style={styles.sliderOne}>
          <Text style={styles.text}>
            min: {nonCollidingMultiSliderValue[0]}{' '}
          </Text>
          <Text style={styles.text}>
            max: {nonCollidingMultiSliderValue[1]}
          </Text>
        </View>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          sliderLength={280}
          onValuesChange={nonCollidingMultiSliderValuesChange}
          min={min}
          max={max}
          step={1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={40}
          // customMarker={CustomMarker}
          // customLabel={CustomLabel}
        />
        {/* <View style={{flex:0.5}}>
              <Input onChange={(value) => {
                     && setMin(Number(value));
                  }}
                  style={{flex:1}}
                  value={localMin.toString()}
                  label="Min price"
                  keyboardType="numeric"
                  placeholder="Min price"
                  />
            </View>
            <View style={{flex:0.5}}>
             <Input onChange={(value) => {
                    && setMax(Number(value));
                  }}
                  style={{flex:1}}
                  value={localMax.toString()}
                  label="Max price"
                  keyboardType="numeric"
                  placeholder="Max price"
                  /> */}
        {/* </View> */}
        <View style={{paddingHorizontal: 15, marginTop: 5}}>
          <Button title="Apply price" onPress={onChange} color="black" />
        </View>
      </View>
    </>
  );
};

export default connectRange(RangeSlider);
