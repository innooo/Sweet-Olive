import React from 'react';
import Loadable from 'react-loadable';
import {
  Switch,
  Route,
} from 'react-router';
import Loading from './utils/loading';

const loadingHomePage = Loadable({
  loader: () => import('./container/homePage'),
  loading: Loading,
});


const loadingEntry = Loadable({
  loader: () => import('./container/entry'),
  loading: Loading,
});

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={loadingHomePage} />
        <Route path='/login' component={loadingEntry} />
      </Switch>
    </div>
  );
};

export default Routes;
