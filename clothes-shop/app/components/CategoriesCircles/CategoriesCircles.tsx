import React from 'react';
import { 
    ScrollView,
    TouchableOpacity
 } from "react-native";
import S from './styles'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Loader,
    Shine,
    ShineOverlay,
  } from 'rn-placeholder';
import FastImage from 'react-native-fast-image'
import {Text} from '..'

interface ListType {
    title : string,
    tag_id: string,
}

interface Props  {
    lists : ListType[],
    onPress: (list: ListType) => void
}

const CategoriesCircles = ({
    lists = [],
    onPress = () => {}
} : Props) => {

    let [loadedImages, setLoadedImages ] = React.useState({});

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            style={[S.topLists]}
            contentContainerStyle={{        
                width:  '100%',
                alignItems: 'stretch',
                justifyContent:'space-around'
            }}
            horizontal={true}
            >
            {lists.map((list : any, i  : number) => {
                return (
                <TouchableOpacity
                    onPress={() => onPress(list)}
                    key={list.title + i}  
                    style={S.topListItem}>
                    {/* <View key={list.title + i} style={S.topListItem}> */}
                    {/* {loadedImages[i] === false ? (
                        <Placeholder
                        Left={PlaceholderMedia}
                        Animation={Shine}>
                        </Placeholder>
                    ) : ( */}
                    <FastImage
                        onLoadStart={() => setLoadedImages({...loadedImages, [i] : false})}
                        onLoadEnd={() => setLoadedImages({...loadedImages, [i] : true})}
                        source={typeof list.image == 'string' ? {uri: list.image} : list.image}
                        style={S.topListImage}
                        resizeMode="cover"
                        />
                    {/* )} */}
                    <Text style={S.topListTitle}>{list.title}</Text>
                    {/* </View> */}
                </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default CategoriesCircles;