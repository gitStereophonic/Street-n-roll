import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class SeventhMusicianPage extends Component {
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

    this.state = {
      hobbieValues: [
        'Занимаюсь только этим, живу на честно наигранное!',
        'Конечно, хобби, кто ж проживет на такие деньги...',
        'Другое: ',
      ],
      ratherValues: [
        'Постоянно, жить без этого не могу, каждый день гоняю',
        'Ну так, по настроению',
        'С некоторой периодичностью: раз в неделю, раз в месяц',
        'Да один только раз было всего!',
        'Завязал, больше не гоняю...',
      ],
    };

    this.handleHobbieOptionChange = this.handleHobbieOptionChange.bind(this);
    this.handleHobbieOtherValueChanged = this.handleHobbieOtherValueChanged.bind(this);
    this.handleRatherOptionChanged = this.handleRatherOptionChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 7) return;
    let green = this.props.interview.seventhFields.hobbie !== '' && this.props.interview.seventhFields.rather !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleHobbieOptionChange(changeEvent) {
    this.props.interview.seventhFields.hobbie = changeEvent.target.value;
    this.checkRequired();

    const inp = $('#hobbie');
    if (inp) {
      if (changeEvent.target.value === this.state.hobbieValues[this.state.hobbieValues.length - 1]) {
        inp.removeClass('inviz');
      } else inp.addClass('inviz');
    }
  }

  handleHobbieOtherValueChanged(changeEvent) {
    this.props.interview.seventhFields.hobbieOther = changeEvent.target.value;
    this.checkRequired();
  }

  handleRatherOptionChanged(changeEvent) {
    const val = changeEvent.target.value === this.state.ratherValues[4] ? 'nope' : 'yep';
    this.props.interview.seventhFields.rather = val;
    this.props.interview.seventhFields.ratherExact = changeEvent.target.value;
    this.props.interview.currentKeyValue = val;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-seventh-musician-page' },
      React.createElement('h1', null, 'Вы музыкант'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/seventh_img.jpg',
        alt: 'page image',
      }),
      React.createElement('p', null, 'Вы-то мне и нужны'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Уличная музыка - это Ваше основное занятие или хобби?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'hobbie',
            value: this.state.hobbieValues[0],
            onChange: this.handleHobbieOptionChange,
            defaultChecked: checkPoints[currentIndex].hobbie === this.state.hobbieValues[0],
          }),
          this.state.hobbieValues[0],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'hobbie',
            value: this.state.hobbieValues[1],
            onChange: this.handleHobbieOptionChange,
            defaultChecked: checkPoints[currentIndex].hobbie === this.state.hobbieValues[1],
          }),
          this.state.hobbieValues[1],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'hobbie',
            value: this.state.hobbieValues[this.state.hobbieValues.length - 1],
            onChange: this.handleHobbieOptionChange,
            defaultChecked:
              checkPoints[currentIndex].hobbie === this.state.hobbieValues[this.state.hobbieValues.length - 1],
          }),
          this.state.hobbieValues[this.state.hobbieValues.length - 1],
          React.createElement('input', {
            id: 'hobbie',
            className:
              checkPoints[currentIndex].hobbie === this.state.hobbieValues[this.state.hobbieValues.length - 1]
                ? ''
                : 'inviz',
            onChange: this.handleHobbieOtherValueChanged,
            defaultValue: checkPoints[currentIndex].hobbieOther,
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как часто Вы играете на улицах?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'rather',
            value: this.state.ratherValues[0],
            onChange: this.handleRatherOptionChanged,
            defaultChecked: checkPoints[currentIndex].ratherExact === this.state.ratherValues[0],
          }),
          this.state.ratherValues[0],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'rather',
            value: this.state.ratherValues[1],
            onChange: this.handleRatherOptionChanged,
            defaultChecked: checkPoints[currentIndex].ratherExact === this.state.ratherValues[1],
          }),
          this.state.ratherValues[1],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'rather',
            value: this.state.ratherValues[2],
            onChange: this.handleRatherOptionChanged,
            defaultChecked: checkPoints[currentIndex].ratherExact === this.state.ratherValues[2],
          }),
          this.state.ratherValues[2],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'rather',
            value: this.state.ratherValues[3],
            onChange: this.handleRatherOptionChanged,
            defaultChecked: checkPoints[currentIndex].ratherExact === this.state.ratherValues[3],
          }),
          this.state.ratherValues[3],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'rather',
            value: this.state.ratherValues[4],
            onChange: this.handleRatherOptionChanged,
            defaultChecked: checkPoints[currentIndex].ratherExact === this.state.ratherValues[4],
          }),
          this.state.ratherValues[4]
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

export default connect(mapStateToProps, mapDispatchToProps)(SeventhMusicianPage);
