import actionTypes from './actionTypes';

const doEntry = payload => {
  return {
    type: actionTypes.ENTRY,
    payload,
  };
};

const actions = {
  doEntry,
};

export default actions;
