import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class SecondPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkRequired();

    this.handleEverPlayedOptionChange = this.handleEverPlayedOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  handleEverPlayedOptionChange(changeEvent) {
    this.props.interview.secondFields.everPlayed = changeEvent.target.value;
    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 2) return;
    const green = this.props.interview.secondFields.everPlayed !== '';
    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-second-page' },
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Играли ли Вы когда-нибудь на улице?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'everPlayed',
            value: 'Да, бывало',
            onChange: this.handleEverPlayedOptionChange,
          }),
          'Да, бывало',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'everPlayed',
            value: 'Нет, никогда',
            onChange: this.handleEverPlayedOptionChange,
          }),
          'Нет, никогда'
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage);
