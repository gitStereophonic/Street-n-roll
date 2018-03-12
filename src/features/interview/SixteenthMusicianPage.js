import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class SixteenthMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkRequired();

    this.state = { other: '' };

    this.handleJargonValueChanged = this.handleJargonValueChanged.bind(this);
    this.handleSpecSignsValueChanged = this.handleSpecSignsValueChanged.bind(this);
    this.handleIdMarksValueChanged = this.handleIdMarksValueChanged.bind(this);
    this.handleForWhatOptionChange = this.handleForWhatOptionChange.bind(this);
    this.handleForWhatOtherOptionChange = this.handleForWhatOtherOptionChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 16) return;
    let green =
      this.props.interview.sixteenthFields.jargon !== '' &&
      (this.props.interview.sixteenthFields.forwhat[0] !== '' ||
        this.props.interview.sixteenthFields.forwhat[1] !== '' ||
        this.props.interview.sixteenthFields.forwhat[2] !== '');

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleJargonValueChanged(changeEvent) {
    this.props.interview.sixteenthFields.jargon = changeEvent.target.value;
    this.checkRequired();
  }

  handleSpecSignsValueChanged(changeEvent) {
    this.props.interview.sixteenthFields.specsigns = changeEvent.target.value;
    this.checkRequired();
  }

  handleIdMarksValueChanged(changeEvent) {
    this.props.interview.sixteenthFields.idmarks = changeEvent.target.value;
    this.checkRequired();
  }

  handleForWhatOptionChange(changeEvent) {
    switch (changeEvent.target.id) {
      case 'comfort':
        this.props.interview.sixteenthFields.forwhat[0] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'insider':
        this.props.interview.sixteenthFields.forwhat[1] = changeEvent.target.checked ? changeEvent.target.value : '';
        break;
      case 'other':
        this.props.interview.sixteenthFields.forwhat[2] = changeEvent.target.checked
          ? changeEvent.target.value + this.state.other
          : '';
        break;
      default:
        break;
    }

    this.checkRequired();
    console.log(this.props.interview.sixteenthFields.forwhat);
  }

  handleForWhatOtherOptionChange(changeEvent) {
    const start = 'Другое: ';
    this.setState({ other: changeEvent.target.value });
    if (this.props.interview.sixteenthFields.forwhat[2] !== '') {
      this.props.interview.sixteenthFields.forwhat[2] = start + changeEvent.target.value;
    }
    this.checkRequired();

    console.log(this.props.interview.sixteenthFields.forwhat);
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-sixteenth-musician-page' },
      React.createElement('h1', null, 'Язык'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Профессиональный жаргон'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Слова, которыми пользуются только музыканты. Могли бы Вы их назвать?'),
        React.createElement('textarea', { id: 'jargon', onChange: this.handleJargonValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Условные знаки')),
        React.createElement('textarea', { id: 'specsigns', onChange: this.handleSpecSignsValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Опознавательные знаки')),
        React.createElement('p', null, 'Как отличить уличного музыканта в толпе?'),
        React.createElement('textarea', { id: 'idmarks', onChange: this.handleIdMarksValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Для чего это нужно?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'checkbox',
            id: 'comfort',
            name: 'forwhat',
            value: 'Для удобства',
            onChange: this.handleForWhatOptionChange,
          }),
          React.createElement('label', { htmlFor: 'comfort' }, 'Для удобства'),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'insider',
            name: 'forwhat',
            value: 'Чтобы понимали только свои',
            onChange: this.handleForWhatOptionChange,
          }),
          React.createElement('label', { htmlFor: 'insider' }, 'Чтобы понимали только свои'),
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'other',
            name: 'forwhat',
            value: 'Другое: ',
            onChange: this.handleForWhatOptionChange,
          }),
          React.createElement('label', { htmlFor: 'other' }, 'Другое: '),
          React.createElement('input', { id: 'forwhatother', htmlFor: 'other', onChange: this.handleForWhatOtherOptionChange })
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

export default connect(mapStateToProps, mapDispatchToProps)(SixteenthMusicianPage);
