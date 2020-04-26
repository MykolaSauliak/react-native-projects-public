import types from './types';

export const addCar = ({carmake, model, type, car_id}) => dispatch => {
  if (!carmake || !model || !type || !car_id) {
    //console.log('data is missign during add car ...')
    return;
  }
  dispatch({
    type: types.addCar,
    payload: {
      carmake,
      model,
      type,
      car_id,
    },
  });
};
export const removeCar = ({carmake, model, type}) => dispatch => {
  if (!carmake || !model || !type) {
    //console.log('data is missign during remove car ...')
    return;
  }
  dispatch({
    type: types.removeCar,
    payload: {
      carmake,
      model,
      type,
    },
  });
};
export const setSelectedCarMake = carmake => dispatch => {
  dispatch({
    type: types.setSelectedCarMake,
    payload: carmake,
  });
};
export const setSelectedModel = model => dispatch => {
  dispatch({
    type: types.setSelectedModel,
    payload: model,
  });
};

export const setSelectedType = type => dispatch => {
  dispatch({
    type: types.setSelectedType,
    payload: type,
  });
};

export const setSelectedCarId = type => dispatch => {
  dispatch({
    type: types.setSelectedCarId,
    payload: type,
  });
};

export const setSelectedCar = car => dispatch => {
  dispatch({
    type: types.setSelectedCar,
    payload: car,
  });
};
