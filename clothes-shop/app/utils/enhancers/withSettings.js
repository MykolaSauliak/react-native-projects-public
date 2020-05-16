import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from "../../features/settings/actions";

const withSettings = (options) => (
    BaseComponent,
  ) => (props) => {
    const dispatch = useDispatch()
    let state = useSelector(state => state)
    let settings = {}
    if(options.pick && Array.isArray(options.pick)){
      options.pick.forEach( key => {
        settings[key] = useSelector(state => state.settings[key])
        settings['set'+key.charAt(0).toUpperCase() + key.slice(1)] = (value) => dispatch(setItem(key, value))
      })
    }
    // console.log('settings',settings)
    
    return (<BaseComponent 
        {...props}
        {...settings}
        // getSettingValue={(key) => state[key]}
        />)
}
  
  export default withSettings;
  