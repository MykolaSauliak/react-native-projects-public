import React from 'react';
import { 
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    ScrollView
 } from "react-native";
import { 
    ListItem, 
    Header, 
    CheckBox
} from "react-native-elements";
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
} from "../../types/types";

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
}) => {

    const onNotificationPress = (item :  ProductNotification | NegotiationNotification | FollowingNotification) => {
        console.log('item',item)
        setViewed({id: item.id})
        switch(item.type){
          case 'product':
            NavigationService.navigateToProduct({id: item.product_id})
            break
          case 'user':
            NavigationService.navigateToCustomUserProfile({user_id : item.user_id})
            break
          case 'negotiations':
            console.log('go to negotiation')
            NavigationService.navigateToNegotiations({...item, id: item.negotiation_id})
            break
        }
    }

    // let notifications = getAllNotifcations()
    // console.log('notifications',notifications.length)
    return (
            <View style={{flex:1}}>
                <Header
                    containerStyle={{backgroundColor:null, borderBottomColor:'black', height: 75}}
                    // leftComponent={{ icon: 'arrow-back', size: 35, color: '#000', onPress: () => NavigationService.goBack() }}
                    leftComponent={{ text: 'Notifications', style: { color: '#000', fontSize: 18, fontWeight: 'bold'} }}
                    leftContainerStyle={{width: '100%'}}
                    centerContainerStyle={{flex:0}}
                    rightComponent={<ShippingCartIcon />}
                    // rightComponent={{ icon: 'settings',size: 35, color: '#000', onPress : () => NavigationService.navigateToNotificationsSettings()}}
                    />
                    <View style={{marginBottom: 50}}>
                        {/* <View> */}
                            <TouchableOpacity style={{position: 'absolute', left: 10, top: 10}} onPress={removeAllNotification}>
                                {/* <Text>remove all</Text> */}
                                <AntDesign  name="delete" size={25} />
                            </TouchableOpacity>
                        {/* </View> */}
                        <TouchableOpacity style={{position: 'absolute', right: 10, top: 10}} onPress={setViewedAll}>
                            <AntDesign  name="eye" size={25} />
                        </TouchableOpacity> 
                    </View>


                    {
                        !hasPermission
                        ?<TouchableOpacity onPress={requestPermission}>
                            <Text style={{}}>Предоставьте разрешение получать уведомления</Text>
                        </TouchableOpacity>
                        :<FlatList 
                            data={notifications}
                            renderItem={({item, index}) => <ListItem 
                                                containerStyle={{minHeight: 100}}
                                                title={item.title}
                                                subtitle={item.ts && moment(item.ts,'x').format('YYYY Do MMMM dddd')}
                                                leftAvatar={{ source : {uri: item.leftImage}}}
                                                rightAvatar={item.rightImage ?  { source : {uri: item.rightImage}} :null}
                                                titleStyle={{opacity: item.viewed ? 0.5 : 1, color: !item.viewed ? 'red': "black"}}
                                                onPress={() => onNotificationPress(item)}
                                                bottomDivider
                                                topDivider
                                                />
                            }
                            />
                    }
        </View>

    );
};

export default Notifications;