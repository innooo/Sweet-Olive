import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Entry from '../views/entry';
import entryActions from '../actions/entry';

const withEntry = (WrappedComponent) => {
  class Container extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  return Container;
};

const mapStateToProps = (state) => ({
  ...state.common,
  ...state.entry,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...entryActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withEntry(Entry));
