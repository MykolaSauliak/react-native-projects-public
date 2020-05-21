import React, { Component } from 'react'
import { 
    View,
    Text 
} from "react-native";
import {
    InstantSearch, 
    connectRefinementList, 
    connectCurrentRefinements,
    connectRange,
    connectToggleRefinement,
    connectStats,
    connectHits,
} from 'react-instantsearch-native';

class RemoveAll extends Component {

    componentWillUnmount(){
        console.log('RemoveAll unmount')
        this.props.refine(this.props.items)
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}

export default connectRefinementList(RemoveAll)