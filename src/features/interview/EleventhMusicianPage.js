import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class EleventhMusicianPage extends Component {
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

    this.state = {
      meetingsValues: ['Да', 'Нет', 'Не знаю'],
    };

    this.handleMeetingsOptionChange = this.handleMeetingsOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 11) return;
    let green = this.props.interview.eleventhFields.meetings !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleMeetingsOptionChange(changeEvent) {
    const val = changeEvent.target.value === this.state.meetingsValues[0] ? 'yep' : 'nope';
    this.props.interview.eleventhFields.meetings = val;
    this.props.interview.eleventhFields.meetingsExact = changeEvent.target.value;
    this.props.interview.currentKeyValue = val;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-eleventh-musician-page' },
      React.createElement('h1', null, 'Едем дальше'),
      React.createElement('p', null, 'Не отчаивайтесь, Вы справитесь. А я буду Вам благодарна :)'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Собираются ли музыканты вместе в свободное от стрита время?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'meetings',
            value: this.state.meetingsValues[0],
            onChange: this.handleMeetingsOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingsExact === this.state.meetingsValues[0],
          }),
          this.state.meetingsValues[0],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'meetings',
            value: this.state.meetingsValues[1],
            onChange: this.handleMeetingsOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingsExact === this.state.meetingsValues[1],
          }),
          'Нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'meetings',
            value: this.state.meetingsValues[2],
            onChange: this.handleMeetingsOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingsExact === this.state.meetingsValues[2],
          }),
          'Не знаю'
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

export default connect(mapStateToProps, mapDispatchToProps)(EleventhMusicianPage);
