import { call, put, fork, take, join, select } from 'redux-saga/effects';
import { testAPI, forkAPI } from '../service/api';
import actionTypes from '../actions/actionTypes';

function *test(params) {
  const res = yield call(testAPI, params);
  console.log('call saga done', params);
  // const task = yield fork(taskTest, params);
  return res;
}

function *forkTest(params) {
  const res = yield call(forkAPI, params);
  return `${res}foooork`;
}

export function *doHome(action) { // 此处的参数就是action{type: xxx, payload: xxx}
  const state = yield select(); // 获取store中的state，非阻塞
  console.log('state', state);
  const { payload } = action;
  const res = yield call(test, payload); // 可以通过call进行阻塞式执行，即等待上一个yield返回结果才会接着执行,通常用于进行异步请求，也可以用它来调用其他generator saga
  /**
   * take的参数成为pattern，pattern可以为字符串、函数、空/*、数组
   */
  yield take(actionTypes.FINISHTAKE); // 当generator执行到此时暂停，直到接收到类型为actionTypes.finishTake的action类型，接着向下执行
  // yield take(actions => actions.type === actionTypes.FINISHTAKE); // 函数返回结果为true，接着执行
  // yield take();
  // yield take([actionTypes.FINISHTAKE]); // 如果数组中有一项匹配，则满足条件，接着向下执行
  const forkRes = yield fork(forkTest, 'forkkk'); // fork意思为“分叉”, 即在这个地方无阻塞得起一个进程，后面的代码会立即执行，而不必等待fork的结果,返回一个task对象
  yield put({ // dispatch一个action到reducer
    type: actionTypes.ADD,
    payload: res,
  });
  const joinFork = yield join(forkRes); // 用于等待并取得fork返回的task执行结束所取得的结果,后面的操作必须等到拿到结果后才会被执行,是阻塞操作
  console.log('join fork', joinFork);
}
