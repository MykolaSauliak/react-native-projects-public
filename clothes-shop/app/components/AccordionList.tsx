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
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../styles/colors';
import FilterRow from '../components/FilterRow'
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import { Text } from '.';
import { ListItem } from 'react-native-elements';
import constants from '../constants';
import globalStyle from '../styles';
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
    subtitle:  string | React.ReactNode,
    label?:  string,
    count?:  number,
    id: string,
    data : Item[],
    onPress? : (item : Item) => void,
}

type Props = {
    items : Item[],
    onItemPress?: (item :Item) => void,
    onSubItemPress?: (item : Item) => void,
}

  
const AccordionList = ({
    items = [],
    subtitleStyle= {},
    onItemPress = () => {},
    closeOnClick = true,
    onSubItemPress,
    showChevron = false,
    titleStyle = {},
    headerProps={},
    rightSubtitle = false
} : Props) => {

    let [activeSections, setActiveSection] = React.useState([])
    console.log('activeSections',activeSections)
    const _renderSectionTitle = (section : Item) => {
        return (
            null
        //   <View style={styles.header}>
        //     <Text style={styles.headerText}>{section.title}</Text>
        //   </View>
        );
      };

      const _renderHeader = (section :Item, index: number) => {
        // let headerProps = {}
        console.log('section',section)
        console.log('index',index)
        if(_.isEmpty(section.data)){
            headerProps.onPress = () => onItemPress(section)
            headerProps.count = section.count
        }

        let Subtitle = () => {};
        // console.log('section.subtitle',section.subtitle)
        if(section.subtitle && typeof section.subtitle != 'string'){
        // if(React.isValidElement(section.subtitle)){
            // console.log('valid')
            Subtitle = section.subtitle
        }else if(typeof section.subtitle == 'string'){
            console.log('subtitle not valid')
            Subtitle= <Text numberOfLines={1} style={[{paddingLeft: 10, width: 150}, subtitleStyle]}>{section.subtitle}</Text>
        }
        // console.log('section.subtitle',section.subtitle)
        // if(section.subtitle){
        //     Subtitle = <Text numberOfLines={1} style={[{paddingLeft: 10, width: 150}, subtitleStyle]}>{section.subtitle || ""}</Text>
        // }
        return (
            <ListItem   
                containerStyle={{height: constants.rowHeight * 1.3}}
                title={<View style={{alignItems:'flex-start'}}>
                    {rightSubtitle ? (
                        <View style={{flexDirection:"row", overflow: 'hidden', }}>
                            <Text bold xmediumSize style={[styles.headerText, titleStyle]}>
                                {section?.title || section.label}
                            </Text>
                            {rightSubtitle && Subtitle}
                        </View>
                    ): (
                        <>
                        <Text bold xmediumSize style={[styles.headerText, titleStyle]}>
                            {section?.title || section.label}
                        </Text>
                        {!rightSubtitle && Subtitle}
                        </>
                    )}

                </View>}
                rightElement={(<View style={{flexDirection: "row", alignItems:'center'}}>
                    {/* <View style={{flex:1}}> */}
                    {/* </View> */}
                    {section?.count  && section?.count > 0 && (<Text>{section.count}</Text>)}
                    {showChevron > 0 && (<Entypo name={activeSections.includes(index) ? "chevron-up" : "chevron-down" } size={25} />)}
                </View>)}
                topDivider
                {...headerProps}
                />
        );
      };
    
      const _renderContent = (item : Item) => {
        return (
            <View>
                {
                    Array.isArray(item.data) && item.data.map((subItem : Item) => (
                        <TouchableOpacity
                            onPress={() => {
                                subItem.onPress ? subItem.onPress(subItem) : onSubItemPress(subItem)
                                if(closeOnClick){
                                    setActiveSection([])
                                }
                                }}>
                            <List.Item style={[{...globalStyle.text}, titleStyle,]} title={subItem.title} />
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
        setActiveSection(activeSections || []);
      };

    return (

            <ScrollView contentContainerStyle={{backgroundColor: colors.gray}}>
                <Accordion
                    sections={items}
                    expandMultiple={false}
                    activeSections={activeSections}
                    renderSectionTitle={_renderSectionTitle}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    />
            </ScrollView>
    )
}

export default AccordionList;

const styles = StyleSheet.create({
    content: {},
    header: {},
    headerText: {},
})