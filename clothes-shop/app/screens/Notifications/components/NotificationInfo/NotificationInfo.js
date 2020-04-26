import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native-elements';
import HorrorBackHeader from '../../../../components/HorrorBackHeader';
import HorrorImageBackground from '../../../../components/HorrorImageBackground';
import HorrorText from '../../../../components/HorrorText';
import {ScrollView} from 'react-native-gesture-handler';

const NotificationInfo = ({image, title, description}) => {
  // console.log('render info')
  return (
    <HorrorImageBackground>
      <View style={{flex: 1}}>
        <HorrorBackHeader title={'Детали оповещения'} />
        <ScrollView>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              source={{uri: image}}
              style={{borderRadius: 5, width: 200, height: 200}}
            />
            <HorrorText size={24}>{title}</HorrorText>
            <HorrorText size={24} />
            <HorrorText size={24}>{`${description}`}</HorrorText>
          </View>
        </ScrollView>
      </View>
    </HorrorImageBackground>
  );
};

NotificationInfo.defaultProps = {
  image: '',
  title: '',
  description: '',
};

export default NotificationInfo;
