import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class TenthMusicianPage extends Component {
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

    this.handleOfficialOptionChange = this.handleOfficialOptionChange.bind(this);
    this.handleOfficialOtherValueChange = this.handleOfficialOtherValueChange.bind(this);
    this.handleWoComValueChanged = this.handleWoComValueChanged.bind(this);
    this.handleHowJoinValueChanged = this.handleHowJoinValueChanged.bind(this);
    this.handleCookiesValueChanged = this.handleCookiesValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 10) return;
    let green = this.props.interview.tenthFields.official !== '' && this.props.interview.tenthFields.howjoin !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleOfficialOptionChange(changeEvent) {
    this.props.interview.tenthFields.official = changeEvent.target.value;
    this.checkRequired();

    const inp = $('#official');
    if (inp) {
      if (changeEvent.target.value === 'Другое: ') inp.removeClass('inviz');
      else inp.addClass('inviz');
    }
  }

  handleOfficialOtherValueChange(changeEvent) {
    this.props.interview.tenthFields.officialOther = changeEvent.target.value;
    this.checkRequired();
  }

  handleWoComValueChanged(changeEvent) {
    this.props.interview.tenthFields.wocom = changeEvent.target.value;
    this.checkRequired();
  }

  handleHowJoinValueChanged(changeEvent) {
    this.props.interview.tenthFields.howjoin = changeEvent.target.value;
    this.checkRequired();
  }

  handleCookiesValueChanged(changeEvent) {
    this.props.interview.tenthFields.cookies = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-tenth-musician-page' },
      React.createElement('h1', null, 'Сообщество'),
      React.createElement('p', null, 'Сообщества это круто'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Официальное?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'official',
            value: 'Да',
            onChange: this.handleOfficialOptionChange,
            defaultChecked: checkPoints[currentIndex].official === 'Да',
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'official',
            value: 'Нет',
            onChange: this.handleOfficialOptionChange,
            defaultChecked: checkPoints[currentIndex].official === 'Нет',
          }),
          'Нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'official',
            value: 'Другое: ',
            onChange: this.handleOfficialOptionChange,
            defaultChecked: checkPoints[currentIndex].official === 'Другое: ',
          }),
          'Другое: ',
          React.createElement('input', {
            id: 'official',
            className: checkPoints[currentIndex].official === 'Другое: ' ? '' : 'inviz',
            onChange: this.handleOfficialOtherValueChange,
            defaultValue: checkPoints[currentIndex].officialOther,
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Может ли уличный музыкант не состоять в сообществе?')
        ),
        React.createElement('p', null, 'Представляет ли это неудобства?'),
        React.createElement('input', {
          id: 'wocom',
          onChange: this.handleWoComValueChanged,
          defaultValue: checkPoints[currentIndex].wocom,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как в него вступить?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'howjoin',
          onChange: this.handleHowJoinValueChanged,
          defaultValue: checkPoints[currentIndex].howjoin,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Какие выгоды приобретает член сообщества?')),
        React.createElement('p', null, 'Плюшечки ^_^'),
        React.createElement('textarea', {
          id: 'cookies',
          onChange: this.handleCookiesValueChanged,
          defaultValue: checkPoints[currentIndex].cookies,
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

export default connect(mapStateToProps, mapDispatchToProps)(TenthMusicianPage);
