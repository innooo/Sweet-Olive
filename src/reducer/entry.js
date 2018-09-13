import actionTypes from '../actions/actionTypes';

const initialState = { b: 'bb' };
export const entryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENTRY:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
