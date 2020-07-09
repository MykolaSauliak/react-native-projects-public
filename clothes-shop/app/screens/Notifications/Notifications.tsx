import React from 'react';
import { 
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Image
 } from "react-native";
import { 
    NavigationService, 
} from '../../services';
import constants from '../../constants';
import S from './Notifications.styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ShippingCartIcon from '../../containers/ShippingCartIcon';
import moment from 'moment';
import { 
    ProductNotification, 
    FollowingNotification,
    NegotiationNotification  
} from "../../types/Notification.type";
import { itemWidth } from '../../components/SliderEntry';
import { refresh } from '../../features/search/actions';
import { BackHeaderCenter, ListItem } from '../../components';
import {  Text} from '../../components';
import FastImage from 'react-native-fast-image';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
import { colors } from '../../styles';
import globalStyles from '../../styles'
import { widthPercentageToDP } from 'react-native-responsive-screen';


const Notifications = ({
    notifications,
    hasPermission,
    requestPermission,
    isSubscribed,
    getAllNotifcations,
    removeAllNotification,
    setViewed,
    subscriptonLastUpdate,
    setViewedAll,
    
    fetchMore,
    refreshing,

}) => {
    let [loadedImages, setLoadedImages] = React.useState({});

    const onNotificationPress = (item :  ProductNotification | NegotiationNotification | FollowingNotification) => {
        console.log('item',item)
        setViewed({id: item.id})
        switch(item.type){
          case 'product':
            console.log('item',item)
            NavigationService.navigateToProduct({id: item.product_id})
            break
          case 'user':
            NavigationService.navigateToCustomUserProfile({user_id : item.user_id})
            break
          case 'negotiation':
            // console.log('go to negotiation')
            NavigationService.navigateToNegotiations({...item, id: item.negotiation_id})
            break
        }
    }

    // let notifications = getAllNotifcations()
    // console.log('notifications',notifications.length)

    const getDate = (item) => {
        if(item.ts){
            return moment(item.ts, 'x').fromNow();
        }
        else if(item.created_time){
            return moment(item.created_time, 'x').fromNow();
        }
        return null
        // return item.ts ? moment(item.ts,'x').format('YYYY Do MMMM dddd') : item.created_time ? moment(item.created_time,'x').format('YYYY Do MMMM dddd') : ""
    }
    return (
            <View style={{flex:1}}>
                <BackHeaderCenter
                    hideBack
                    title="Notifications"
                    // containerStyle={{backgroundColor:null, borderBottomColor:'black', height: 75}}
                    // leftComponent={{ text: 'Notifications', style: { color: '#000', fontSize: 18, fontWeight: 'bold'} }}
                    // leftContainerStyle={{width: '100%'}}
                    // centerContainerStyle={{flex:0}}
                    rightComponent={<ShippingCartIcon />}
                    />
                    {/* <View style={{marginBottom: 50}}> */}
                        {/* <TouchableOpacity style={{position: 'absolute', left: 10, top: 10}} onPress={removeAllNotification}>
                                <AntDesign  name="delete" size={25} />
                            </TouchableOpacity>
                        <TouchableOpacity style={{position: 'absolute', right: 10, top: 10}} onPress={setViewedAll}>
                            <AntDesign  name="eye" size={25} />
                        </TouchableOpacity>  */}
                    {/* </View> */}
                    {!hasPermission
                        ?<TouchableOpacity onPress={requestPermission}>
                            <Text style={{}}>Предоставьте разрешение получать уведомления</Text>
                        </TouchableOpacity>
                        :<FlatList 
                            data={notifications}
                            refreshControl={<RefreshControl 
                                onRefresh={fetchMore}
                                refreshing={refreshing}    
                            />} 
                            renderItem={({item, index}) => {
                                if(!item){
                                    return null
                                }
                                if(item.rightImage){
                                    Image.prefetch(item.rightImage);
                                }
                                if(item.leftImage){
                                    Image.prefetch(item.leftImage);
                                }
                                item.leftImage = item?.leftImage || ""
                                return(
                                    <ListItem 
                                        containerStyle={{minHeight: constants.DEVICE_WIDTH * 0.25}}
                                        title={item.title + `${item.subtitle ? '\n' + item.subtitle :""}`}
                                        // title={item.title + `${item.subtitle ? '\n' + item.subtitle :""}`}
                                        subtitle={getDate(item)}
                                        // ci
                                        leftAvatar={{
                                            // containerStyle: {margin:0, padding:0},
                                            size: constants.DEVICE_WIDTH * 0.12,
                                            ImageComponent: (props) => <Image {...props} loadingIndicatorSource={constants.logo}/>,
                                            // ImageComponent: item?.leftImage.length > 0 ? FastImage : Image,
                                            rounded: true,
                                            source : item?.leftImage.length > 0 ? {uri: item.leftImage } : constants.defaultImage, 
                                            // source : item?.leftImage.length > 0 ? {uri: item.leftImage } : constants.defaultImage, 
                                            // defaultSource: constants.logo
                                        }}
                                        leftElement={!item.viewed && <View style={{width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 5}}/>}
                                        // leftElement={<View style={{width: 50,height:50}} >
                                        //     <FastImage
                                        //         style={{width: 50,height:50}} 
                                        //         source={{uri: item.leftImage}}
                                        //         onLoadStart={() => setLoadedImages({...loadedImages, [item.leftImage] : false })}    
                                        //         onLoadEnd={() => setLoadedImages({...loadedImages, [item.leftImage] : true })}    
                                        // />
                                        // {loadedImages[item.leftImage] == false && (
                                        //     <View style={{position:'absolute'}}>
                                        //         <Placeholder
                                        //             Animation={Fade}
                                        //             Left={PlaceholderMedia}
                                        //             // Right={PlaceholderMedia}
                                        //                 >
                                        //             {/* <PlaceholderLine width={80} />
                                        //             <PlaceholderLine />
                                        //             <PlaceholderLine width={30} /> */}
                                        //          </Placeholder>
                                        //     </View>
                                        // )}
                                        // </View>}
                                        // leftElement={<View style={{width: 50,height:50}} >
                                        //     <FastImage
                                        //         style={{width: 50,height:50}} 
                                        //         source={{uri: item.leftImage}}
                                        //         onLoadStart={() => setLoadedImages({...loadedImages, [item.leftImage] : false })}    
                                        //         onLoadEnd={() => setLoadedImages({...loadedImages, [item.leftImage] : true })}    
                                        // />
                                        // {loadedImages[item.leftImage] == false && (
                                        //     <View style={{position:'absolute'}}>
                                        //         <Placeholder
                                        //             Animation={Fade}
                                        //             Left={PlaceholderMedia}
                                        //             // Right={PlaceholderMedia}
                                        //                 >
                                        //             {/* <PlaceholderLine width={80} />
                                        //             <PlaceholderLine />
                                        //             <PlaceholderLine width={30} /> */}
                                        //          </Placeholder>
                                        //     </View>
                                        // )}
                                        // </View>}
                                        rightAvatar={item.rightImage ? { 
                                            // containerStyle: {margin:0, padding:0},
                                            // avatarStyle: {margin: 0, padding:0},
                                            size: constants.DEVICE_WIDTH * 0.17,
                                            source : {uri: item.rightImage}, 
                                            defaultSource: constants.defaultImage, 
                                            renderPlaceholderContent: <FastImage  source={constants.defaultImage}/>
                                        } : null}
                                        titleStyle={{...globalStyles.title, ...globalStyles.boldText, fontSize: widthPercentageToDP(4.5), color:'black', lineHeight: 24,  }}
                                        subtitleStyle={{...globalStyles.title,  color: "gray", lineHeight: 24, fontSize: 15}}
                                        onPress={() => onNotificationPress(item)}
                                        bottomDivider
                                        topDivider
                                        />
                                )
                            }
                            }
                            />
                    }
        </View>

    );
};

export default Notifications;