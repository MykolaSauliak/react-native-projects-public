import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  // allCars: [],
  cars: [
    /**{
      carmake,
      model,
      type
    }  **/
  ],
  selectedCar: {},
  selectedCarMake: null, // {image, title}
  selectedCarId: null, //
  selectedModel: null, // {title, type}
  selectedType: null, // {title, type}
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setSelectedCar]: (state, {payload}) => {
    return {...state, selectedCar: payload};
  },
  [types.addCar]: (state, {payload}) => {
    return {
      ...state,
      cars: [...state.cars.filter(c => c.car_id != payload.car_id), payload],
    };
    // return {...state, cars : [...state.cars.filter(c => c.carmake != carmake && c.model != model && c.type != type ), {carmake, model, type, car_id}]}
  },
  [types.removeCar]: (state, {payload: {carmake, model, type}}) => {
    return {
      ...state,
      cars: [
        ...state.cars.filter(
          c => c.carmake != carmake && c.model != model && c.type != type,
        ),
      ],
    };
  },
  [types.setSelectedCarMake]: (state, {payload}) => {
    return {...state, selectedCarMake: payload};
  },
  [types.setSelectedModel]: (state, {payload}) => {
    return {...state, selectedModel: payload};
  },
  [types.setSelectedType]: (state, {payload}) => {
    return {...state, selectedType: payload};
  },
  [types.setSelectedCarId]: (state, {payload}) => {
    return {...state, setSelectedCarId: payload};
  },
});
