import Reactotron, {
  asyncStorage,
  trackGlobalErrors,
} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

// const filterRegex = /(entities\.(.*)\.add\(\))|(@APPLY_SNAPSHOT)|(afterAttach)/;

const reactotron = Reactotron.configure({
  name: 'React Native Clothes',
})
  .useReactNative({
    asyncStorage: true,
  }) // add all built-in react native plugins
  .use(
    // mst({
    //   filter: (event) => !event.name.match(filterRegex),
    // }),
    reactotronRedux(),
    // asyncStorage(),
    // trackGlobalErrors(),
  ) // plus some custom made plugin.
  .connect();

export default reactotron;
