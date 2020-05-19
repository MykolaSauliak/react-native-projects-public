import React from 'react';
import {  
  View,
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
import Accordion from 'react-native-collapsible/Accordion';
import { Text } from '.';
import { ListItem } from 'react-native-elements';
import constants from '../constants';
import _ from 'lodash'

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
    subtitle,
    subtitleStyle= {},
    onItemPress,
    closeOnClick = true,
    onSubItemPress,
} : Props) => {

    let Subtitle: React.ReactNode
    if(React.isValidElement(subtitle)){
        Subtitle = subtitle
    }else{
        Subtitle= () => <Text style={[subtitleStyle]}>{subtitle || ""}</Text>
    }

    let [activeSections, setActiveSection] = React.useState([])

    const _renderSectionTitle = (section : Item) => {
        return (
            null
        //   <View style={styles.header}>
        //     <Text style={styles.headerText}>{section.title}</Text>
        //   </View>
        );
      };
    


      const _renderHeader = (section :Item) => {
        let headerProps = {}
        if(_.isEmpty(section.data)){
            headerProps.onPress = () => onItemPress(section)
            headerProps.count = section.count
        }
        return (
            <ListItem   
                containerStyle={{height: constants.rowHeight * 1.3}}
                title={<View style={{alignItems:'flex-start'}}>
                    <Text bold xmediumSize style={styles.headerText}>{section?.title || section.label}</Text>
                    {Subtitle}
                </View>}
                topDivider
                {...headerProps}
                />
        //     <View style={{alignItems:'flex-start', padding: 10, border}}>

        //   </View>
        //   <View style={styles.header}>
        //     <Text style={styles.headerText}>{section.title}</Text>
        //   </View>
        );
      };
    
      const _renderContent = (item : Item) => {
        return (
            <View>
                {
                    item.data && item.data.map((subItem : Item) => (
                        <TouchableOpacity
                            onPress={() => {
                                subItem.onPress ? subItem.onPress(subItem) : onSubItemPress(subItem)
                                if(closeOnClick){
                                    setActiveSection([])
                                }
                                }}>
                            <List.Item title={subItem.title} />
                    </TouchableOpacity>
                    ))
                }
            </View>
        //   <View style={styles.content}>
        //     <Text>{section.content}</Text>
        //   </View>
        );
      };
    
      const _updateSections = (activeSections : any[]) => {
        setActiveSection(activeSections);
      };

    return (
        // <FlatList
            // // data={types.filter(
            // //   type =>
            // //     type && type.category_ids && type.category_ids.includes(category_id),
            // // )}
            // contentContainerStyle={{flex:1}}
            // data={items}
            // renderItem={({item}) => (
            // <ScrollView contentContainerStyle={{backgroundColor: colors.gray}}>
            //     <View style={[S.listAccordion]}>
            //         {
            //             !item.data || item.data.length == 0
            //             ?(
            //             <FilterRow 
            //                 onPress={() => onItemPress(item)}
            //                 title={item?.title || item.label} 
            //                 subtitle={Subtitle}
            //                 count={item.count}
            //                 />
            //             )
            //             :
                        (
                            <Accordion
                                sections={items}
                                expandMultiple={false}
                                activeSections={activeSections}
                                renderSectionTitle={_renderSectionTitle}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            />
                        )
                        // :(<List.Accordion
                        //     title={<View>
                        //         <Text>{item?.title || item.label}</Text>
                        //         {Subtitle}
                        //     </View>}
                        //     titleStyle={{fontWeight: 'bold', color: 'black'}}
                        //     // style={{borderColor:'black', borderBottomWidth: 1}}
                        //     >
                        //         {
                        //             item.data && item.data.map((subItem : Item) => (
                        //                 <TouchableOpacity
                        //                     onPress={() => subItem.onPress ? subItem.onPress(subItem) : onSubItemPress(subItem)}>
                        //                     <List.Item title={subItem.title} />
                        //             </TouchableOpacity>
                        //             ))
                        //         }

                        // </List.Accordion>
                        // )
                    // }
        //         </View>
        //     </ScrollView>
        //     )}
        // />
    )
}

export default AccordionList;

const styles = StyleSheet.create({
    content: {},
    header: {},
    headerText: {},
})