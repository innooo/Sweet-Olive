import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';

// 引入sagas
import { doHome } from './homePage';

function *rootSaga() { // 注册actionTypes对应的事件处理函数
  yield takeEvery(actionTypes.HOME, doHome);
}

export default rootSaga;
