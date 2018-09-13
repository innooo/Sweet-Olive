import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import homePageActions from '../actions/homePage';
import HomePage from '../views/homePage';

const withHomePage = (WrappedComponent) => {
  class Container extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  return Container;
};

const mapStateToProps = (state) => {
  return {
    ...state.common,
    ...state.homePage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...homePageActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withHomePage(HomePage));
