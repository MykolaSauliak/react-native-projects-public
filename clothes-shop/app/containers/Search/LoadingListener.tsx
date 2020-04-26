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
    connectStateResults,
    connectHits,
    } from 'react-instantsearch-native';

type Props = {
    isSearchStalled: boolean,
    searchingForFacetValues: boolean,
    onLoadingChange : (loading: boolean) => void
}

type State = {
    loading: boolean,
}

class LoadingListener extends Component<Props,State> {

    state = {
        loading: false
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate',prevProps)
        let loading = !this.props.isSearchStalled && this.props.searchingForFacetValues
        if(this.state.loading != loading && this.props.onLoadingChange != null){
            this.props.onLoadingChange(loading)
            this.setState(() => ({
                loading
            }))

        }
    }

    render() {
        return (
            null
        )
    }
}

export default connectStateResults(LoadingListener)