import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class TwentyFirstMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 21) return;
    let green = this.props.interview.twentySecondFields.names !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-twenty-first-musician-page' },
      React.createElement('h1', null, 'Клички'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у Вас прозвище?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'names',
            value: 'Да',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].names === 'Да',
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '18 - 25',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '18 - 25',
          }),
          '18 - 25',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '25 - 40',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '25 - 40',
          }),
          '25 - 40',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '40 - 60',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '40 - 60',
          }),
          '40 - 60',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: 'Больше 60',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === 'Больше 60',
          }),
          'Больше 60'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у Вас прозвище?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Например, дни памяти или солидарности'),
        React.createElement('input', {
          id: 'celebrations',
          onChange: this.handleCelebrationsValueChanged,
          defaultValue: checkPoints[currentIndex].celebrations,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как их отмечают?')),
        React.createElement('textarea', {
          id: 'howceleb',
          onChange: this.handleHowCelebValueChanged,
          defaultValue: checkPoints[currentIndex].howceleb,
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

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFirstMusicianPage);
