import actionTypes from './actionTypes';

const doHome = payload => {
  return {
    type: actionTypes.HOME,
    payload,
  };
};

const emitTakeAction = payload => {
  return {
    type: actionTypes.FINISHTAKE,
    payload,
  };
};

const actions = {
  doHome,
  emitTakeAction,
};

export default actions;
