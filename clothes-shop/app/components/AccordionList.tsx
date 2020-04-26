import React from 'react';
import {  
  View,
  Text,
  TouchableOpacity,
  FlatList, 
  StyleSheet
} from "react-native";
import {
  List,
  Checkbox
} from 'react-native-paper';
import colors from '../styles/colors';
import FilterRow from '../components/FilterRow'

const S = StyleSheet.create({
    listAccordion: {
        backgroundColor: 'white',
        // borderColor: colors.gray,
        // shadowColor:'black',
        // shadowRadius:5,
        // borderTopWidth: 2,
        width: '100%',
        minHeight: 75,
        justifyContent: 'center',
      },
    first: {
        borderTopColor: null,
        borderTopWidth: 0,
    },
        last: {
        borderBottomWidth: 1,
    },
})

type Item = {
    title:  string,
    label?:  string,
    count?:  number,
    id: string,
    data : Item[],
    onPress? : (item : Item) => void,
  }

type Props = {
    items : Item[],
    onItemPress : (item :Item) => void,
    onSubItemPress : (item : Item) => void,
}

  
const AccordionList = ({
    items,
    onItemPress,
    onSubItemPress,
} : Props) => {
    return (
        <FlatList
            // data={types.filter(
            //   type =>
            //     type && type.category_ids && type.category_ids.includes(category_id),
            // )}
            data={items}
            renderItem={({item}) => (
            <View style={[S.listAccordion]}>
                {
                    !item.data || item.data.length == 0
                    ?(
                      <FilterRow 
                        onPress={() => onItemPress(item)}
                        title={item?.title || item.label} 
                        count={item.count}
                        />
                    )
                    :(<List.Accordion
                        title={item?.title || item.label}
                        titleStyle={{fontWeight: 'bold'}}
                        >
                            {
                            item.data && item.data.map((subItem : Item) => (
                                <TouchableOpacity
                                    onPress={() => subItem.onPress ? subItem.onPress(subItem) : onSubItemPress(subItem)}>                               }>
                                    <List.Item title={subItem.title} />
                            </TouchableOpacity>
                            ))
                        }
                    </List.Accordion>
                    )
                }
            </View>
            )}
        />
    )
}

export default AccordionList;