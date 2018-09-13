import actionTypes from './actionTypes';

const doAdd = payload => {
  return {
    type: actionTypes.ADD,
    payload,
  };
};

const actions = {
  doAdd,
};

export default actions;
