import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class ThirteenthMusicianPage extends Component {
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

    this.handlePlaceValueChanged = this.handlePlaceValueChanged.bind(this);
    this.handleDescPlaceValueChanged = this.handleDescPlaceValueChanged.bind(this);
    this.handleTimeValueChanged = this.handleTimeValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 13) return;
    let green =
      this.props.interview.thirteenthFields.place !== '' && this.props.interview.thirteenthFields.descplace !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handlePlaceValueChanged(changeEvent) {
    this.props.interview.thirteenthFields.place = changeEvent.target.value;
    this.checkRequired();
  }

  handleDescPlaceValueChanged(changeEvent) {
    this.props.interview.thirteenthFields.descplace = changeEvent.target.value;
    this.checkRequired();
  }

  handleTimeValueChanged(changeEvent) {
    this.props.interview.thirteenthFields.time = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-thirteenth-musician-page' },
      React.createElement('h1', null, 'Место и время'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/thirteenth_img.jpg',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как выбирается место для стрита?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'place',
          onChange: this.handlePlaceValueChanged,
          defaultValue: checkPoints[currentIndex].place,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Каким должно быть это место?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'descplace',
          onChange: this.handleDescPlaceValueChanged,
          defaultValue: checkPoints[currentIndex].descplace,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Когда лучше всего играть и почему?')),
        React.createElement('textarea', {
          id: 'time',
          onChange: this.handleTimeValueChanged,
          defaultValue: checkPoints[currentIndex].time,
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

export default connect(mapStateToProps, mapDispatchToProps)(ThirteenthMusicianPage);
