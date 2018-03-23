import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class TwelfthMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.cheackRequired();
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.state = {
      dayTime: ['Утром', 'Днем', 'Вечером', 'Ночью', 'По ситуации'],
    };

    this.handleReasonsValueChanged = this.handleReasonsValueChanged.bind(this);
    this.handleWhereValueChanged = this.handleWhereValueChanged.bind(this);
    this.handleWhyWhereValueChanged = this.handleWhyWhereValueChanged.bind(this);
    this.handleMeetingTimeOptionChange = this.handleMeetingTimeOptionChange.bind(this);
    this.cheackRequired = this.cheackRequired.bind(this);
  }

  cheackRequired() {
    if (this.props.interview.currentIndex !== 12) return;
    let green = this.props.interview.twelfthFields.reasons !== '' && this.props.interview.twelfthFields.where !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleReasonsValueChanged(changeEvent) {
    this.props.interview.twelfthFields.reasons = changeEvent.target.value;
    this.cheackRequired();
  }

  handleWhereValueChanged(changeEvent) {
    this.props.interview.twelfthFields.where = changeEvent.target.value;
    this.cheackRequired();
  }

  handleWhyWhereValueChanged(changeEvent) {
    this.props.interview.twelfthFields.whywhere = changeEvent.target.value;
    this.cheackRequired();
  }

  handleMeetingTimeOptionChange(changeEvent) {
    switch (changeEvent.target.id) {
      case 'morning':
        this.props.interview.twelfthFields.meetingtime[0] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'midday':
        this.props.interview.twelfthFields.meetingtime[1] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'evening':
        this.props.interview.twelfthFields.meetingtime[2] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'night':
        this.props.interview.twelfthFields.meetingtime[3] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'situation':
        this.props.interview.twelfthFields.meetingtime[4] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      default:
        break;
    }
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-twelfth-musician-page' },
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'По каким поводам?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'reasons',
          onChange: this.handleReasonsValueChanged,
          defaultValue: checkPoints[currentIndex].reasons,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Где?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'where',
          onChange: this.handleWhereValueChanged,
          defaultValue: checkPoints[currentIndex].where,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Почему именно там?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'whywhere',
          onChange: this.handleWhyWhereValueChanged,
          defaultValue: checkPoints[currentIndex].whywhere,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Когда?')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'checkbox',
            id: 'morning',
            name: 'meetingtime',
            value: this.state.dayTime[0],
            onChange: this.handleMeetingTimeOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingtime[0] === this.state.dayTime[0],
          }),
          React.createElement('label', { htmlFor: 'morning' }, this.state.dayTime[0]),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'midday',
            name: 'meetingtime',
            value: this.state.dayTime[1],
            onChange: this.handleMeetingTimeOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingtime[1] === this.state.dayTime[1],
          }),
          React.createElement('label', { htmlFor: 'midday' }, this.state.dayTime[1]),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'evening',
            name: 'meetingtime',
            value: this.state.dayTime[2],
            onChange: this.handleMeetingTimeOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingtime[2] === this.state.dayTime[2],
          }),
          React.createElement('label', { htmlFor: 'evening' }, this.state.dayTime[2]),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'night',
            name: 'meetingtime',
            value: this.state.dayTime[3],
            onChange: this.handleMeetingTimeOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingtime[3] === this.state.dayTime[3],
          }),
          React.createElement('label', { htmlFor: 'night' }, this.state.dayTime[3]),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'situation',
            name: 'meetingtime',
            value: this.state.dayTime[4],
            onChange: this.handleMeetingTimeOptionChange,
            defaultChecked: checkPoints[currentIndex].meetingtime[4] === this.state.dayTime[4],
          }),
          React.createElement('label', { htmlFor: 'situation' }, this.state.dayTime[4])
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

export default connect(mapStateToProps, mapDispatchToProps)(TwelfthMusicianPage);
