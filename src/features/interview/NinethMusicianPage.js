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

    this.state = {
      communityValues: [
        'Есть, и даже не одно',
        'Есть, одно',
        'Есть, и я в нем состою',
        'Точно нет',
        'Может, и есть, но я не в курсе',
      ],
    };

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
    const val =
      changeEvent.target.value === this.state.communityValues[3] ||
      changeEvent.target.value === this.state.communityValues[4]
        ? 'nope'
        : 'yep';
    this.props.interview.ninethFields.community = val;
    this.props.interview.ninethFields.communityExact = changeEvent.target.value;
    this.props.interview.currentKeyValue = val;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

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
            value: this.state.communityValues[0],
            onChange: this.handleCommunityOptionChanged,
            defaultChecked: checkPoints[currentIndex].communityExact === this.state.communityValues[0],
          }),
          this.state.communityValues[0],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: this.state.communityValues[1],
            onChange: this.handleCommunityOptionChanged,
            defaultChecked: checkPoints[currentIndex].communityExact === this.state.communityValues[1],
          }),
          this.state.communityValues[1],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: this.state.communityValues[2],
            onChange: this.handleCommunityOptionChanged,
            defaultChecked: checkPoints[currentIndex].communityExact === this.state.communityValues[2],
          }),
          this.state.communityValues[2],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: this.state.communityValues[3],
            onChange: this.handleCommunityOptionChanged,
            defaultChecked: checkPoints[currentIndex].communityExact === this.state.communityValues[3],
          }),
          this.state.communityValues[3],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'community',
            value: this.state.communityValues[4],
            onChange: this.handleCommunityOptionChanged,
            defaultChecked: checkPoints[currentIndex].communityExact === this.state.communityValues[4],
          }),
          this.state.communityValues[4]
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
