import { LOCATION_CHANGE } from 'react-router-redux';
import actionTypes from '../actions/actionTypes';

const initialState = { a: 'aa' };
export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
      };
    case actionTypes.HOME:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
