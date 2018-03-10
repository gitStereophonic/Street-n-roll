import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FifthListenerPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'interview-fifth-listener-page' },
      'Page Content: interview/FifthListenerPage'
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    interview: state.interview,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FifthListenerPage);
