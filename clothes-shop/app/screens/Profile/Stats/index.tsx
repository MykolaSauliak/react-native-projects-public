import React from 'react';
import Stats from "./Stats";
import { compose } from "recompose";
import { withAuth } from '../../../utils/enhancers';

const enhance = compose(
    withAuth(),
)

export default enhance(Stats);