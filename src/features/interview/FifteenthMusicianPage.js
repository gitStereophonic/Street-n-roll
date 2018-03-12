import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class FifteenthMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkRequired();
    window.scrollTo(0, 0);

    this.handleHowComeValueChanged = this.handleHowComeValueChanged.bind(this);
    this.handleHowLeaveValueChanged = this.handleHowLeaveValueChanged.bind(this);
    this.handleFirstMoneyValueChanged = this.handleFirstMoneyValueChanged.bind(this);
    this.handleTalkValueChanged = this.handleTalkValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 15) return;
    let green =
      this.props.interview.fifteenthFields.howcome !== '' &&
      this.props.interview.fifteenthFields.howleave !== '' &&
      this.props.interview.fifteenthFields.firstmoney !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
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

  render() {
    return React.createElement(
      'div',
      { className: 'interview-fifteenth-musician-page' },
      React.createElement('h1', null, 'Обычаи'),
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
        React.createElement('textarea', { id: 'howcome', onChange: this.handleHowComeValueChanged })
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
        React.createElement('textarea', { id: 'howleave', onChange: this.handleHowLeaveValueChanged })
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
        React.createElement('input', { id: 'firstmoney', onChange: this.handleFirstMoneyValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как Вы общаетесь с людьми?')),
        React.createElement('textarea', { id: 'talk', onChange: this.handleTalkValueChanged })
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

export default connect(mapStateToProps, mapDispatchToProps)(FifteenthMusicianPage);
