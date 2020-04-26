import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'horror',
  },
  overAudio: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'gray',
    zIndex: -1,
  },
});

export default styles;
