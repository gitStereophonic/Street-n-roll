import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class SeventeenthMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleCelebrationsOptionChange = this.handleCelebrationsOptionChange.bind(this);
    this.handleWhatCelebValueChanged = this.handleWhatCelebValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 17) return;
    let green = this.props.interview.seventeenthFields.celebrations !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleCelebrationsOptionChange(changeEvent) {
    this.props.interview.seventeenthFields.celebrations = changeEvent.target.value;
    this.checkRequired();
  }

  handleWhatCelebValueChanged(changeEvent) {
    this.props.interview.seventeenthFields.whatceleb = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-seventeenth-musician-page' },
      React.createElement('h1', null, 'Праздники'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у уличных музыкантов "свои" праздники?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Например, дни памяти или солидарности'),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'celebrations',
            value: 'Да',
            onChange: this.handleCelebrationsOptionChange,
            defaultChecked: checkPoints[currentIndex].celebrations === 'Да',
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'celebrations',
            value: 'Нет',
            onChange: this.handleСelebrationsOptionChange,
            defaultChecked: checkPoints[currentIndex].celebrations === 'Нет',
          }),
          'Нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'celebrations',
            value: 'Не знаю',
            onChange: this.handleСelebrationsOptionChange,
            defaultChecked: checkPoints[currentIndex].celebrations === 'Не знаю',
          }),
          'Не знаю'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Если да, то какие?')),
        React.createElement('textarea', {
          id: 'whatceleb',
          onChange: this.handleWhatCelebValueChanged,
          defaultValue: checkPoints[currentIndex].whatceleb,
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(SeventeenthMusicianPage);
