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
import { ScrollView } from 'react-native-gesture-handler';

const S = StyleSheet.create({
    listAccordion: {
        backgroundColor: 'white',
        borderBottomColor: colors.black,
        borderBottomWidth: 0.5,
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
            contentContainerStyle={{flex:1}}
            data={items}
            renderItem={({item}) => (
            <ScrollView contentContainerStyle={{backgroundColor: colors.gray}}>
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
                            titleStyle={{fontWeight: 'bold', color: 'black'}}
                            // style={{borderColor:'black', borderBottomWidth: 1}}
                            >
                                {
                                    item.data && item.data.map((subItem : Item) => (
                                        <TouchableOpacity
                                            onPress={() => subItem.onPress ? subItem.onPress(subItem) : onSubItemPress(subItem)}>
                                            <List.Item title={subItem.title} />
                                    </TouchableOpacity>
                                    ))
                                }

                        </List.Accordion>
                        )
                    }
                </View>
            </ScrollView>
            )}
        />
    )
}

export default AccordionList;