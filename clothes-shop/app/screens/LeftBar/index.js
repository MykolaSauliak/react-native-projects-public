import {compose, withState, withHandlers} from 'recompose';
import LeftBarView from './LeftBarView';
// import { getSounds } from '../../features/sounds/selectors';
import {connect} from 'react-redux';
import screens from '../../constants/screens';

const mapStateToProps = state => ({
  // sounds:  getSounds(state),
});

const mapDispatchToProps = {};

const enhance = compose(
  connect(mapStateToProps),
  withState('viewType', 'setViewType', 'list'),
  withHandlers({
    openAudio: props => item => {
      props.navigation.navigate(screens.PlayerScreen, {...item});
    },
  }),
);

export default enhance(LeftBarView);
