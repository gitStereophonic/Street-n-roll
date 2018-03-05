import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FirstPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'interview-first-page' },
      React.createElement('h1', null, '... и так, начнем!'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Из какого Вы города?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', { id: 'city' })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Сколько Вам лет?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', { type: 'radio', name: 'age', value: 'less18' }),
          'Меньше 18',
          React.createElement('br'),
          React.createElement('input', { type: 'radio', name: 'age', value: '18-25' }),
          '18 - 25',
          React.createElement('br'),
          React.createElement('input', { type: 'radio', name: 'age', value: '25-40' }),
          '25 - 40',
          React.createElement('br'),
          React.createElement('input', { type: 'radio', name: 'age', value: '40-60' }),
          '40 - 60',
          React.createElement('br'),
          React.createElement('input', { type: 'radio', name: 'age', value: 'over60' }),
          'Больше 60'
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
