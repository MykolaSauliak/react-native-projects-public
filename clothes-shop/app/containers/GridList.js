import React from 'react';
import GridList from '../components/GridList/GridList';
import {compose} from 'recompose';
import {withFavorite} from '../utils/enhancers';
import constants from '../constants';

const enhance = compose(withFavorite({listName: constants.clothes}));

export default enhance(GridList);
