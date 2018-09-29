import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class ThirdListenerPage extends Component {
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

    this.handleInterestValueChanged = this.handleInterestValueChanged.bind(this);
    this.handleWhoValueChanged = this.handleWhoValueChanged.bind(this);
    this.handleMoneyValueChanged = this.handleMoneyValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 3) return;
    let green = this.props.interview.thirdFields.who !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleInterestValueChanged(changeEvent) {
    this.props.interview.thirdFields.interest = changeEvent.target.value;
    this.checkRequired();
  }

  handleWhoValueChanged(changeEvent) {
    this.props.interview.thirdFields.who = changeEvent.target.value;
    this.checkRequired();
  }

  handleMoneyValueChanged(changeEvent) {
    this.props.interview.thirdFields.money = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-third-listener-page' },
      React.createElement('h1', null, 'Вы мирный житель'),
      React.createElement('img', { className: 'page-head-img', src: '../../images/third_img.jpg', alt: 'page image' }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Интересует ли Вас уличная музыка и ее исполнители?')
        ),
        'Шли бы все эти дармоеды работать!',
        React.createElement('input', {
          type: 'range',
          name: 'everPlayed',
          min: 0,
          max: 6,
          onChange: this.handleInterestValueChanged,
          defaultValue: checkPoints[currentIndex].interest,
        }),
        'Играют огонь! Каждый раз останавливаюсь'
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Кто такие, на Ваш взгляд, уличные музыканты?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'p',
          null,
          'Что это за люди, какими они должны быть, честны ли они, симпатизируете ли Вы им?'
        ),
        React.createElement('input', {
          id: 'who',
          onChange: this.handleWhoValueChanged,
          defaultValue: checkPoints[currentIndex].who,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Даете ли Вы деньги музыкантам и почему?')),
        React.createElement('input', {
          id: 'money',
          onChange: this.handleMoneyValueChanged,
          defaultValue: checkPoints[currentIndex].money,
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

export default connect(mapStateToProps, mapDispatchToProps)(ThirdListenerPage);
