import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users, UserInfo, QuestionInfo } from './';
import * as actions from './redux/actions';

export class StatByUsers extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'the-data-pick-up-stat-by-users' },
      React.createElement('div', { id: 'users' }, React.createElement(Users)),
      React.createElement('div', { id: 'allStat' }, React.createElement(QuestionInfo)),
      React.createElement('div', { id: 'userInfo' }, React.createElement(UserInfo))
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
)(StatByUsers);
