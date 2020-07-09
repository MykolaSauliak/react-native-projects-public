import React from 'react';
import { View, Image, StyleSheet } from "react-native";
import {Text, Loading} from '../../components'
// import HorrorImageBackground from '../../components/HorrorImageBackground';
import Logo from '../../assets/images/logo.jpg'
import codePush from 'react-native-code-push'
import { colors } from '../../styles';

const DownloadingScreen = ({

}) => {

    let [progress, setDownloadingProgress] = React.useState(0)
    let [status, setStatus] = React.useState("")

    React.useEffect(() => {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE,
            updateDialog: false 
            },
            (status) => {
                switch (status) {
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        // Show "downloading" modal
                        setStatus("DOWNLOADING_PACKAGE")
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        setStatus("INSTALLING UPDATE")
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        // Hide "downloading" modal
                        // setStatus("UPDATE INSTALLED")
                        setStatus("")
                        break;
                }
            },
            ({ receivedBytes, totalBytes, }) => {
                setDownloadingProgress((receivedBytes / totalBytes).toFixed(2)  * 100)
            /* Update download modal progress */
            }
        );
    }, [])

    if(!status){
        return null
    }
    console.log('status',status)
    console.log('progress',progress)
    return (
        // <HorrorImageBackground>
            <View style={{flex:1,zIndex:22, ...StyleSheet.absoluteFill, alignItems:'center', justifyContent:"center", backgroundColor: 'white'}}>
                <Image source={Logo} style={{width: '50%', maxHeight: 150, borderRadius: 25}} resizeMode="contain" />
                <Text black>{status}</Text>
                <Loading />
                {progress > 0 && <Text black>{progress + " %"}</Text>}
            </View>

        // </HorrorImageBackground>
    );
};

export default DownloadingScreen;