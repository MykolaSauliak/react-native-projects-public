import {compose, withState, withHandlers} from 'recompose';
import AudioListView from './AudioListView';
import {getSounds} from '../../features/sounds/selectors';
import {connect} from 'react-redux';
import screens from '../../constants/screens';
import {playSound} from '../../features/trackplayer/operations';
import {setCurrentSound} from '../../features/trackplayer/actions';
import constants from '../../constants';

const mapStateToProps = state => ({
  sounds: getSounds(state),
});

const mapDispatchToProps = {};

const enhance = compose(
  connect(mapStateToProps),
  withState('viewType', 'setViewType', constants.LIST),
  withHandlers({
    openAudio: ({navigation, dispatch}) => item => {
      // //console.log('item ',item)
      dispatch(setCurrentSound(item));
      dispatch(playSound(item));
      navigation.navigate(screens.PlayerScreen, {...item});
    },
  }),
);

export default enhance(AudioListView);
