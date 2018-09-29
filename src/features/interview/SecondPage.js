import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class SecondPage extends Component {
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

    this.handleEverPlayedOptionChange = this.handleEverPlayedOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  handleEverPlayedOptionChange(changeEvent) {
    this.props.interview.secondFields.everPlayed = changeEvent.target.value;
    this.props.interview.currentKeyValue = changeEvent.target.value;
    if (changeEvent.target.value === 'yep') {
      this.props.interview.keyValues[this.props.interview.lastPage].back = this.props.interview.lasts.yeplast;
    } else {
      this.props.interview.keyValues[this.props.interview.lastPage].back =
        this.props.interview.lasts.nopelast;
    }
    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 2) return;
    let green = this.props.interview.secondFields.everPlayed !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-second-page' },
      React.createElement('img', {
        className: 'page-head-img',
        src: './../../images/second_img.jpg',
        alt: 's image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Случалось ли Вам играть на улице?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'everPlayed',
            value: 'yep',
            onChange: this.handleEverPlayedOptionChange,
            defaultChecked: checkPoints[currentIndex].everPlayed === 'yep',
          }),
          'Да, бывало',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'everPlayed',
            value: 'nope',
            onChange: this.handleEverPlayedOptionChange,
            defaultChecked: checkPoints[currentIndex].everPlayed === 'nope',
          }),
          'Нет, никогда'
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage);
