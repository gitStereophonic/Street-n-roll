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

    this.handleHobbieOptionChange = this.handleHobbieOptionChange.bind(this);
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
      if (changeEvent.target.value === 'other') inp.removeClass('inviz');
      else inp.addClass('inviz');
    }
  }

  render() {
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
            value: 'Занимаюсь только этим, живу на честно наигранное!',
            onChange: this.handleHobbieOptionChange,
          }),
          'Занимаюсь только этим, живу на честно наигранное!',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'hobbie',
            value: 'Конечно, хобби, кто ж проживет на такие деньги...',
            onChange: this.handleHobbieOptionChange,
          }),
          'Конечно, хобби, кто ж проживет на такие деньги...',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'hobbie',
            value: 'other',
            onChange: this.handleHobbieOptionChange,
          }),
          'Другое: ',
          React.createElement('input', { id: 'hobbie', className: 'inviz' })
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
