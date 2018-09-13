import 'babel-polyfill'; // es6相关垫片
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'; // 引入创建store方法
import { Provider } from 'react-redux';
import { routerReducer, ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddle from 'redux-saga';

import App from './app';
import reducer from './reducer';
import rootSaga from './saga';

const reducers = combineReducers({
  ...reducer,
  router: routerReducer,
});
const historyMiddle = routerMiddleware(history);
const sagaMiddle = createSagaMiddle();
const history = createBrowserHistory();
const middleware = [historyMiddle, sagaMiddle];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

sagaMiddle.run(rootSaga); // 初始化saga的运行

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
