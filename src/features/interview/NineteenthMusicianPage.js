import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class NineteenthMusicianPage extends Component {
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

    this.handleEventsValueChanged = this.handleEventsValueChanged.bind(this);
    this.handleReactionsValueChanged = this.handleReactionsValueChanged.bind(this);
    this.handleStoryValueChanged = this.handleStoryValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 19) return;
    let green = this.props.interview.nineteenthFields.events !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleEventsValueChanged(changeEvent) {
    this.props.interview.nineteenthFields.events = changeEvent.target.value;
    this.checkRequired();
  }

  handleReactionsValueChanged(changeEvent) {
    this.props.interview.nineteenthFields.reactions = changeEvent.target.value;
    this.checkRequired();
  }

  handleStoryValueChanged(changeEvent) {
    this.props.interview.nineteenthFields.story = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-nineteenth-musician-page' },
      React.createElement('h1', null, 'Реакция'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/nineteenth_img.jpg',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'На какие события откликаются музыканты?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'p',
          null,
          'Например, гибель кумира (смерть Горшка, Честера Беннингтона), флэшмобы, массовые мероприятия и пр.'
        ),
        React.createElement('textarea', {
          id: 'events',
          onChange: this.handleEventsValueChanged,
          defaultValue: checkPoints[currentIndex].events,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Какой может быть их реакция?')),
        React.createElement('p', null, 'Смена репертуара, сходки и пр.'),
        React.createElement('textarea', {
          id: 'reactions',
          onChange: this.handleReactionsValueChanged,
          defaultValue: checkPoints[currentIndex].reactions,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Опишите конкретный случай')),
        React.createElement('p', null, 'Я знаю, что вам уже надоело описывать конкретный случай, но это важно'),
        React.createElement('textarea', {
          id: 'story',
          onChange: this.handleStoryValueChanged,
          defaultValue: checkPoints[currentIndex].story,
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

export default connect(mapStateToProps, mapDispatchToProps)(NineteenthMusicianPage);
