import {compose, withState, withHandlers, withProps} from 'recompose';
import FilterSort from './FilterSort';
import constants from '../../../constants';
import {withSearch} from '../../../utils/enhancers';
// import brands from "../../mockData/brands";
// import materials from "../../mockData/materials";
// import conditions from "../../mockData/conditions";
// import colors from "../../mockData/colors";

const enhance = compose(
  withSearch(constants.clothes),
  // connect(mapStateToProps),
  // withFilterSort({listName : 'clothes'}),
  // withProps(({navigation}) => {
  // console.log(navigation.state)
  // return{
  //     searchState : navigation.state?.params?.searchState,
  //     onSearchStateChange : navigation?.state?.params?.onSearchStateChange,
  // }
  // brands : brands,
  //         colors : colors,
  //         materials : materials,
  //         countries: [{title: "Ukraine"},{"title" : "Slovania"}],
  //         conditions: conditions,
  //     }),
  //     withState('viewType','setViewType', 'list'),
  //     withState('lastUpdate','setLastUpdate', null),
  //     withHandlers({

  //     })
);

export default enhance(FilterSort);
// export default FilterSort;
