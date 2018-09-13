import React from 'react';

import classes from './index.less';

const HomePage = props => {
  const { actions } = props;
  console.log(actions);
  return (
    <div>
      <h2 className={classes.test}>home</h2>
      <button type='button' onClick={() => actions.doHome('aaa')}>hang on</button>
      <button type='button' onClick={() => actions.emitTakeAction()}>emit</button>
    </div>
  );
};

export default HomePage;
