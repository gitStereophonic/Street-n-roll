import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class EleventhMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkRequired();
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleMeetingsOptionChange = this.handleMeetingsOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 11) return;
    let green = this.props.interview.eleventhFields.meetings !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleMeetingsOptionChange(changeEvent) {
    this.props.interview.eleventhFields.meetings = changeEvent.target.value;
    this.props.interview.currentKeyValue = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
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
            value: 'yep',
            onChange: this.handleMeetingsOptionChange,
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'meetings',
            value: 'nope',
            onChange: this.handleMeetingsOptionChange,
          }),
          'Нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'meetings',
            value: 'nope',
            onChange: this.handleMeetingsOptionChange,
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
