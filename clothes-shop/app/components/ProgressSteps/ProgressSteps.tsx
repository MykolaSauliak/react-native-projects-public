import React from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { Text, ActivityIndicator } from '..';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { height } from '../../constants/dimensions';
import { colors } from '../../styles';

interface Props {
    width:string,
    lineColor:string,
    height:number,
    bedges:any[],
    progress:number,
    containerStyle:any,
    PointerComponent:any,
    pointerTitle:string,
    pointerStyle:any,
    pointerTitleStyle:any,
}

const ProgressSteps = ({
    width = '100%',
    height = 5,
    lineColor = colors.orange,
    bedges = [],
    progress  = 0.3,
    containerStyle = {},
    PointerComponent,
    pointerTitle,
    pointerTitleStyle= {},
    pointerStyle = {},
    ...otherProps
} :Props) => {

    let [loading, setLoading] = React.useState(true)
    let [opacity, setOpacity] = React.useState(0)
    let [progressWidth, setProgressWidth] = React.useState()
    let [bedgesLayouts, setBedgesLayouts] = React.useState({

    })
    let [containerLayout, setContainerLayout] = React.useState({x: 0,y: 0, width: 0, height:0})
    let [progressLayout, setProgressLayout] = React.useState({x: 0,y: 0, width: 0, height:0})
    let [pointerLayout, setPointerLayout] = React.useState({x: 0,y: 0, width: 0, height:0})
    let [pointerHeight, setPonterHeight] = React.useState(0)

    if(!width){
        width = Dimensions.get('window').width * 0.8
    }

    const getBedgeStyle = (progress = 0, index = 0) => {
        // console.log(progress)
        // console.log(progressLayout)
        const style = {zIndex: 1, position: "absolute", left: '-100%', alignItems: 'center'}
        if(!progressLayout.width){
            return style
        }
        else{
            return {
                ...style,
                left: progressLayout.x + (progressLayout.width * progress) - (bedgesLayouts[index] ? bedgesLayouts[index].width /2 : -10)
            }
        }
    }

    const getPointerStyle = () => {
        const style = {alignItems: 'flex-start', zIndex: 1, position: "absolute", left: '-100%',top: -5}
        if(!containerLayout.width){
            return style
        }
        else{
            return {
                ...style,
                left: containerLayout.width * progress - (pointerLayout.width ? (pointerLayout.width / 2) - 5 : -2)
            }
        }
    }

    const _renderPointer = () => {
        if(!PointerComponent){
            PointerComponent = <View onLayout={({nativeEvent: {layout : {height}}}) => setPonterHeight(height)}  
                        style={[getPointerStyle(), pointerStyle]}>
                        {pointerTitle && <Text style={[{textAlign: "left"}, pointerTitleStyle]}>{pointerTitle}</Text>}
                        <AntDesign  onLayout={({nativeEvent: {layout}}) => setPointerLayout(layout)} name="caretdown" size={15} />
                </View>
        }
        return <View style={{flex:1,height : pointerHeight}}>{PointerComponent}</View>
    }

    const _renderBottomPointer = () => {
        return (
            <View style={{height: bedgesLayouts[0]?.height || 0}}>
                {bedges.map(({Component, progress}, index) => (
                    <View onLayout={({nativeEvent: {layout}}) => setBedgesLayouts({...bedgesLayouts, [index]: layout})} 
                        style={getBedgeStyle(progress, index)}>
                        <View style={{ backgroundColor: lineColor, width: 2 * height, height: 2 * height, borderRadius: height, marginTop: -(1.5 * height)}}/>
                        <View style={{ backgroundColor: lineColor, width: 2, height: 5}}/>
                        {Component}
                    </View>

                ))}
            </View>
        )
    }

    return (
        <View style={[{flex:1, alignItems:'flex-start', maxWidth :width, opacity}, containerStyle]} onLayout={({nativeEvent: { layout}}) => setContainerLayout(layout)}>
            {_renderPointer()}
            <Progress.Bar  
                height={height}
                progress={progress} 
                width={containerLayout?.width || 0}  
                onLayout={({nativeEvent: { layout}}) => {setOpacity(1); setProgressLayout(layout)}}
                {...otherProps}
                />
            {_renderBottomPointer()}
        </View>
    );
};

export default ProgressSteps;