import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class FirstPage extends Component {
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

    this.handleCityValueChange = this.handleCityValueChange.bind(this);
    this.handleAgeOptionChange = this.handleAgeOptionChange.bind(this);
    this.handleEduOptionChange = this.handleEduOptionChange.bind(this);
    this.handleGenderOptionChange = this.handleGenderOptionChange.bind(this);
    this.handleEduOtherValueChange = this.handleEduOtherValueChange.bind(this);
    this.handleJobValueChange = this.handleJobValueChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  handleCityValueChange(changeEvent) {
    this.props.interview.firstFields.city = changeEvent.target.value;
    this.checkRequired();
  }

  handleAgeOptionChange(changeEvent) {
    this.props.interview.firstFields.age = changeEvent.target.value;
    this.checkRequired();
  }

  handleGenderOptionChange(changeEvent) {
    this.props.interview.firstFields.gender = changeEvent.target.value;
    this.checkRequired();
  }

  handleEduOptionChange(changeEvent) {
    this.props.interview.firstFields.edu = changeEvent.target.value;
    this.checkRequired();
    const inp = $('#edu');
    if (inp) {
      if (changeEvent.target.value === 'other') inp.removeClass('inviz');
      else inp.addClass('inviz');
    }
  }

  handleEduOtherValueChange(changeEvent) {
    this.props.interview.firstFields.eduOther = changeEvent.target.value;
    this.checkRequired();
  }

  handleJobValueChange(changeEvent) {
    this.props.interview.firstFields.job = changeEvent.target.value;
    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 1) return;
    let green =
      this.props.interview.firstFields.city !== '' &&
      this.props.interview.firstFields.age !== '' &&
      this.props.interview.firstFields.gender !== '' &&
      this.props.interview.firstFields.edu !== '' &&
      this.props.interview.firstFields.job !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;
    return React.createElement(
      'div',
      { className: 'interview-first-page' },
      React.createElement('img', { className: 'page-head-img', src: '../../images/first_img.jpg', alt: 'page image' }),
      React.createElement('h1', null, '... итак, начнем!'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Из какого Вы города?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', {
          id: 'city',
          type: 'text',
          onChange: this.handleCityValueChange,
          defaultValue: checkPoints[currentIndex].city,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Сколько Вам лет?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: 'Меньше 18',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === 'Меньше 18',
          }),
          'Меньше 18',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '18 - 25',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '18 - 25',
          }),
          '18 - 25',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '25 - 40',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '25 - 40',
          }),
          '25 - 40',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '40 - 60',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === '40 - 60',
          }),
          '40 - 60',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: 'Больше 60',
            onChange: this.handleAgeOptionChange,
            defaultChecked: checkPoints[currentIndex].age === 'Больше 60',
          }),
          'Больше 60'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Ваш пол'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'gender',
            value: 'Мужчина',
            onChange: this.handleGenderOptionChange,
            defaultChecked: checkPoints[currentIndex].gender === 'Мужчина',
          }),
          'Мужчина',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'gender',
            value: 'Женщина',
            onChange: this.handleGenderOptionChange,
            defaultChecked: checkPoints[currentIndex].gender === 'Женщина',
          }),
          'Женщина'
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Уровень образования'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Среднее общее',
            onChange: this.handleEduOptionChange,
            defaultChecked: checkPoints[currentIndex].edu === 'Среднее общее',
          }),
          'Среднее общее',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Среднее специальное',
            onChange: this.handleEduOptionChange,
            defaultChecked: checkPoints[currentIndex].edu === 'Среднее специальное',
          }),
          'Среднее специальное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Высшее неполное',
            onChange: this.handleEduOptionChange,
            defaultChecked: checkPoints[currentIndex].edu === 'Высшее неполное',
          }),
          'Высшее неполное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Высшее полное',
            onChange: this.handleEduOptionChange,
            defaultChecked: checkPoints[currentIndex].edu === 'Высшее полное',
          }),
          'Высшее полное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'other',
            onChange: this.handleEduOptionChange,
            defaultChecked: checkPoints[currentIndex].edu === 'other',
          }),
          'Другое: ',
          React.createElement('input', {
            id: 'edu',
            className: checkPoints[currentIndex].edu === 'other' ? '' : 'inviz',
            onChange: this.handleEduOtherValueChange,
            defaultValue: checkPoints[currentIndex].eduOther,
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Ваш род занятий'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', {
          id: 'job',
          onChange: this.handleJobValueChange,
          defaultValue: checkPoints[currentIndex].job,
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

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
