import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pages } from './';
import * as actions from './redux/actions';

export class StatByQuestions extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'the-data-pick-up-stat-by-questions' },
      React.createElement('div', { id: 'pages' }, React.createElement(Pages))
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    theDataPickUp: state.theDataPickUp,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatByQuestions);
