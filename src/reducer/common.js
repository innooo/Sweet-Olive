import actionTypes from '../actions/actionTypes';

export const commonReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      console.log('add emit');
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
