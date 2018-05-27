import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Users extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { startData } = this.props.theDataPickUp;
    const usersToRender = [];
    for (let i = 0; i < startData.length; i += 1) {
      usersToRender.push(
        React.createElement(
          'p',
          { className: 'userPanel' },
          `${startData[i].id} : ${startData[i].city} : ${startData[i].age}`
        )
      );
    }
    return React.createElement(
      'div',
      { className: 'the-data-pick-up-users' },
      React.createElement('p', { className: 'statPanel' }, 'Summary'),
      usersToRender
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
