import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { connectToggleRefinement } from 'react-instantsearch-native';
import _ from 'lodash'
import { colors } from '../../styles';
import { ListItem, Text } from '../../components';


const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemCount: {
    backgroundColor: '#252b33',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },    
  filterContainer : {
    padding : 15,
    height: 65,
    borderBottomColor : 'black',
    backgroundColor : 'white'
  },
});

const ToggleRefinement = ({
  refine,
  attribute,
  currentRefinement = false,
  label,
  count = {},
  subtitle,
  ...otherProps
}) => {

  // console.log('ToggleRefinement label',label)
  // console.log('ToggleRefinement currentRefinement',count,attribute)
  // console.log('ToggleRefinement currentRefinement',currentRefinement)
  // console.log('refine',refine)
  if(!currentRefinement && !count.unchecked){
    return null
  }

  return <ListItem 
        topDivider 
        bottomDivider 
        containerStyle={styles.filterContainer} 
        // title={label + ` (${count.checked || 0})`}
        title={label}
        subtitle={subtitle}
        rightElement={<Text>
           {currentRefinement ? "" : count.unchecked}
        </Text>}
        switch={{ 
            value: currentRefinement,
            onValueChange: (value) =>  {
                refine(!currentRefinement)
            },
            thumbColor: 'white',
            trackColor: {false:     colors.gray, true: colors.orange}
        }}
        />
//   return <View style={styles.container}>
//     <View style={styles.title}>
//       <Text style={styles.titleText}>{label}</Text>
//     </View>
//     <View style={styles.list}>
//       {items.map(item => {
//         const labelStyle = {
//           fontSize: 16,
//           fontWeight: item.isRefined ? '800' : '400',
//         };

//         return (
//           <TouchableOpacity
//             key={item.value}
//             onPress={() => {
//               // console.log('item.value',item.value)
//               refine(item.value)
//             }}
//             style={styles.item}>
//             <Text style={labelStyle}>{item.label}</Text>
//             <View style={styles.itemCount}>
//               <Text style={styles.itemCountText}>{item.count}</Text>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   </View>
}

const ItemPropType = PropTypes.shape({
  // value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

ToggleRefinement.propTypes = {
    label: PropTypes.string,
    refine: PropTypes.func.isRequired,
};

export default connectToggleRefinement(ToggleRefinement);
