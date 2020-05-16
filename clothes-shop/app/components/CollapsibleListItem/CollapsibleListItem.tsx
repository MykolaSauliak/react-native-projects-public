import React from 'react';
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CollapsibleListItem = ({
    CollapseComponent,
    collapseStyle = {},
    collapseText = "",
    collapseContainerStyle = {},
    collapsed : collapsedInitial,
    ...props
}) => {

    let [ collapsed, setCollapsed] = React.useState(collapsedInitial)
    if(!CollapseComponent){
        CollapseComponent = () => <Text>{collapseText}</Text>
    }
    return (
        <View>
            <ListItem 
                {...props}
                onPress={() => setCollapsed(!collapsed)}
                Component={TouchableOpacity}
                rightIcon={ collapsed ? {type: "antdesign", name: 'caretdown', size: 13,} : {size: 13, type: "antdesign", name: 'caretup'}}
                />
            {!collapsed && (<Animatable.View
                // duration={300}
                // transition="backgroundColor"
                animation={!collapsed ? 'zoomIn' : false}
                duration={300}
                easing="ease-out"
                style={[collapseContainerStyle]}
                // style={{ backgroundColor: (!collapsed ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}
                >
                <Animatable.Text
                    duration={400}
                    easing="ease-in"
                    animation={!collapsed ? 'zoomIn' : false}>
                    {collapseText}
                </Animatable.Text>
            </Animatable.View>)}
        </View>
    );
};

export default CollapsibleListItem;