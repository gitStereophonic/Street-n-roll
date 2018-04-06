import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FinishPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { resetInterview } = this.props.actions;
    return React.createElement(
      'div',
      { className: 'interview-finish-page' },
      React.createElement('h1', null, 'СПАСИБО ВАМ!'),
      React.createElement('p', null, 'Вы помогли одному студенту не вылететь с первого курса!'),
      React.createElement(
        'button',
        { id: 'reset-btn', onClick: resetInterview },
        React.createElement('p', { id: 'p1' }, 'Эй! Псть!'),
        React.createElement('p', { id: 'p2' }, 'Хочешь повторить?')
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(FinishPage);
