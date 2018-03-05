import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class FirstPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { city: '', age: '', gender: '', eduChosen: '' };

    this.handleCityValueChange = this.handleCityValueChange.bind(this);
    this.handleAgeOptionChange = this.handleAgeOptionChange.bind(this);
    this.handleEduOptionChange = this.handleEduOptionChange.bind(this);
    this.handleGenderOptionChange = this.handleGenderOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  handleCityValueChange(changeEvent) {
    this.setState({ city: changeEvent.target.value });
    this.checkRequired();
  }

  handleAgeOptionChange(changeEvent) {
    this.setState({ age: changeEvent.target.value });
    this.checkRequired();
  }

  handleGenderOptionChange(changeEvent) {
    this.setState({ gender: changeEvent.target.value });
    this.checkRequired();
  }

  handleEduOptionChange(changeEvent) {
    this.setState({ eduChosen: changeEvent.target.value });
    this.checkRequired();
  }

  checkRequired() {
    const green =
      this.state.city !== '' && this.state.age !== '' && this.state.gender !== '' && this.state.eduChosen !== '';
    $('.next-btn')[0].disabled = !green;
    const d = $('.next-btn');
    console.log(d);
    console.log(green);
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-first-page' },
      React.createElement('h1', null, '... и так, начнем!'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Из какого Вы города?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', { id: 'city', onChange: this.handleCityValueChange })
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
          }),
          'Меньше 18',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '18 - 25',
            onChange: this.handleAgeOptionChange,
          }),
          '18 - 25',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '25 - 40',
            onChange: this.handleAgeOptionChange,
          }),
          '25 - 40',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: '40 - 60',
            onChange: this.handleAgeOptionChange,
          }),
          '40 - 60',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'age',
            value: 'Больше 60',
            onChange: this.handleAgeOptionChange,
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
          }),
          'Мужчина',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'gender',
            value: 'Женщина',
            onChange: this.handleGenderOptionChange,
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
          }),
          'Среднее общее',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Среднее специальное',
            onChange: this.handleEduOptionChange,
          }),
          'Среднее специальное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Высшее неполное',
            onChange: this.handleEduOptionChange,
          }),
          'Высшее неполное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Высшее полное',
            onChange: this.handleEduOptionChange,
          }),
          'Высшее полное',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'edu',
            value: 'Другое',
            onChange: this.handleEduOptionChange,
          }),
          'Другое: ',
          React.createElement('input', { id: 'edu', disabled: this.state.eduChosen !== 'other' })
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

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
