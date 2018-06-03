import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class TwentySecondMusicianPage extends Component {
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

    this.state = {
      problemsValues: [
        'Столкновения со стражами порядка',
        'Конфликты с прохожими',
        'Профессиональная конкуренция',
        'У меня не было проблем',
        'Все перечисленное',
        'Другое: ',
      ],
    };

    this.handleProblemsOptionChange = this.handleProblemsOptionChange.bind(this);
    this.handleProblemsOtherValueChange = this.handleProblemsOtherValueChange.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 22) return;
    let green = this.props.interview.twentySecondFields.problems !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleProblemsOptionChange(changeEvent) {
    const val =
      changeEvent.target.value === this.state.problemsValues[2] ||
      changeEvent.target.value === this.state.problemsValues[3]
        ? 'yep'
        : 'nope';
    this.props.interview.twentySecondFields.problems = val;
    this.props.interview.twentySecondFields.problemsExact = changeEvent.target.value;
    this.props.interview.currentKeyValue = val;
    this.checkRequired();

    const inp = $('#problems');
    if (inp) {
      if (changeEvent.target.value === this.state.problemsValues[5]) inp.removeClass('inviz');
      else inp.addClass('inviz');
    }
  }

  handleProblemsOtherValueChange(changeEvent) {
    this.props.interview.twentySecondFields.problemsOther = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-twenty-second-musician-page' },
      React.createElement('h1', null, 'Проблемы'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/eighteenth_img.png',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'С какими проблемами сталкиваются уличные музыканты?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[0],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[0],
          }),
          this.state.problemsValues[0],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[1],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[1],
          }),
          this.state.problemsValues[1],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[2],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[2],
          }),
          this.state.problemsValues[2],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[3],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[3],
          }),
          this.state.problemsValues[3],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[4],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[4],
          }),
          this.state.problemsValues[4],
          React.createElement('br'),
          React.createElement('input', {
            type: 'radio',
            name: 'problems',
            value: this.state.problemsValues[5],
            onChange: this.handleProblemsOptionChange,
            defaultChecked: checkPoints[currentIndex].problemsExact === this.state.problemsValues[5],
          }),
          this.state.problemsValues[5],
          React.createElement('input', {
            id: 'problems',
            className: checkPoints[currentIndex].problemsExact === this.state.problemsValues[5] ? '' : 'inviz',
            onChange: this.handleProblemsOtherValueChange,
            defaultValue: checkPoints[currentIndex].problemsOther,
          })
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

export default connect(mapStateToProps, mapDispatchToProps)(TwentySecondMusicianPage);
