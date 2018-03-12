import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class NinethMusicianPage extends Component {
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

    this.handleCommunityOptionChanged = this.handleCommunityOptionChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 9) return;
    let green = this.props.interview.ninethFields.community !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleCommunityOptionChanged(changeEvent) {
    this.props.interview.ninethFields.community = changeEvent.target.value;
    this.props.interview.currentKeyValue = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-nineth-musician-page' },
      React.createElement('h1', null, 'Сообщество'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли в Вашем городе сообщество уличных музыкантов?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: 'yep',
            onChange: this.handleCommunityOptionChanged,
          }),
          'Есть, и даже не одно',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: 'yep',
            onChange: this.handleCommunityOptionChanged,
          }),
          'Есть, одно',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: 'yep',
            onChange: this.handleCommunityOptionChanged,
          }),
          'Есть, и я в нем состою',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: 'nope',
            onChange: this.handleCommunityOptionChanged,
          }),
          'Точно нет',
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: 'nope',
            onChange: this.handleCommunityOptionChanged,
          }),
          'Может, и есть, но я не в курсе'
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

export default connect(mapStateToProps, mapDispatchToProps)(NinethMusicianPage);
