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
  };

  constructor(props) {
    super(props);

    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleNamesOptionChange = this.handleNamesOptionChange.bind(this);
    this.handleNamesListValueChanged = this.handleNamesListValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  handleNamesOptionChange(changeEvent) {
    this.props.interview.twentyFirstFields.names = changeEvent.target.value;
    this.checkRequired();
  }

  handleNamesListValueChanged(changeEvent) {
    this.props.interview.twentyFirstFields.nameslist = changeEvent.target.value;
    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 21) return;
    let green = this.props.interview.twentyFirstFields.names !== '';

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
            onChange: this.handleNamesOptionChange,
            defaultChecked: checkPoints[currentIndex].names === 'Да',
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'names',
            value: 'Нет',
            onChange: this.handleNamesOptionChange,
            defaultChecked: checkPoints[currentIndex].names === 'Нет',
          }),
          'Нет'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Если да, то какое?')),
        React.createElement('input', {
          id: 'nameslist',
          onChange: this.handleNamesListValueChanged,
          defaultValue: checkPoints[currentIndex].nameslist,
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
