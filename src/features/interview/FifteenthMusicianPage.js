import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class FifteenthMusicianPage extends Component {
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

    this.handleHowComeValueChanged = this.handleHowComeValueChanged.bind(this);
    this.handleHowLeaveValueChanged = this.handleHowLeaveValueChanged.bind(this);
    this.handleFirstMoneyValueChanged = this.handleFirstMoneyValueChanged.bind(this);
    this.handleTalkValueChanged = this.handleTalkValueChanged.bind(this);
    this.handleMascotOptionChange = this.handleMascotOptionChange.bind(this);
    this.handleMascotDescValueChanged = this.handleMascotDescValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 15) return;
    let green =
      this.props.interview.fifteenthFields.howcome !== '' &&
      this.props.interview.fifteenthFields.howleave !== '' &&
      this.props.interview.fifteenthFields.firstmoney !== '' &&
      this.props.interview.fifteenthFields.mascot !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleHowComeValueChanged(changeEvent) {
    this.props.interview.fifteenthFields.howcome = changeEvent.target.value;
    this.checkRequired();
  }

  handleHowLeaveValueChanged(changeEvent) {
    this.props.interview.fifteenthFields.howleave = changeEvent.target.value;
    this.checkRequired();
  }

  handleFirstMoneyValueChanged(changeEvent) {
    this.props.interview.fifteenthFields.firstmoney = changeEvent.target.value;
    this.checkRequired();
  }

  handleTalkValueChanged(changeEvent) {
    this.props.interview.fifteenthFields.talk = changeEvent.target.value;
    this.checkRequired();
  }

  handleMascotOptionChange(changeEvent) {
    this.props.interview.fifteenthFields.mascot = changeEvent.target.value;
    this.checkRequired();
  }

  handleMascotDescValueChanged(changeEvent) {
    this.props.interview.fifteenthFields.mascotdesc = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-fifteenth-musician-page' },
      React.createElement('h1', null, 'Обычаи'),
      React.createElement('p', null, 'Детали и особенности поведения на стриту'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/fifth_img.jpg',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как Вы приходите на место?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'p',
          null,
          'Приходите, раскладываете инструмент, начинаете играть. Есть ли в этом что-то особенное для вас?'
        ),
        React.createElement('textarea', {
          id: 'howcome',
          onChange: this.handleHowComeValueChanged,
          defaultValue: checkPoints[currentIndex].howcome,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'А уходите с него?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'howleave',
          onChange: this.handleHowLeaveValueChanged,
          defaultValue: checkPoints[currentIndex].howleave,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как принимаете первые заработанные деньги?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', {
          id: 'firstmoney',
          onChange: this.handleFirstMoneyValueChanged,
          defaultValue: checkPoints[currentIndex].firstmoney,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как Вы общаетесь с людьми?')),
        React.createElement('textarea', {
          id: 'talk',
          onChange: this.handleTalkValueChanged,
          defaultValue: checkPoints[currentIndex].talk,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у Вас талисманы/приметы на удачу?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'mascot',
            value: 'Да',
            onChange: this.handleMascotOptionChange,
            defaultChecked: checkPoints[currentIndex].mascot === 'Да',
          }),
          'Да',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'mascot',
            value: 'Нет',
            onChange: this.handleMascotOptionChange,
            defaultChecked: checkPoints[currentIndex].mascot === 'Нет',
          }),
          'Нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'mascot',
            value: 'Это чё за вопросы стремные?',
            onChange: this.handleMascotOptionChange,
            defaultChecked: checkPoints[currentIndex].mascot === 'Это чё за вопросы стремные?',
          }),
          'Это чё за вопросы стремные?'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Если да, опишите их?'),
        ),
        React.createElement('textarea', {
          id: 'mascotdesc',
          onChange: this.handleMascotDescValueChanged,
          defaultValue: checkPoints[currentIndex].mascotdesc,
        })
      ),
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

export default connect(mapStateToProps, mapDispatchToProps)(FifteenthMusicianPage);
