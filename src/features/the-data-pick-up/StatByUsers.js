import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users, UserInfo } from './';
import * as actions from './redux/actions';

export class StatByUsers extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'the-data-pick-up-stat-by-users' },
      React.createElement('div', { id: 'users' }, React.createElement(Users)),
      React.createElement('div', { id: 'allStat' }),
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

export default connect(mapStateToProps, mapDispatchToProps)(StatByUsers);
