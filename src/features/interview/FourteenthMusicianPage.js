import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';
import { InterviewPage } from './InterviewPage';

export class FourteenthMusicianPage extends Component {
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

    this.handleWhatPlayValueChanged = this.handleWhatPlayValueChanged.bind(this);
    this.handleWhyThisPlayValueChanged = this.handleWhyThisPlayValueChanged.bind(this);
    this.handlePlacePlayValueChanged = this.handlePlacePlayValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);

    this.checkRequired();
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 14) return;
    let green =
      this.props.interview.fourteenthFields.whatplay !== '' &&
      this.props.interview.fourteenthFields.whythisplay !== '' &&
      this.props.interview.fourteenthFields.placeplay !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    InterviewPage.nextStatus(green, 500);
  }

  handleWhatPlayValueChanged(changeEvent) {
    this.props.interview.fourteenthFields.whatplay = changeEvent.target.value;
    this.checkRequired();
  }

  handleWhyThisPlayValueChanged(changeEvent) {
    this.props.interview.fourteenthFields.whythisplay = changeEvent.target.value;
    this.checkRequired();
  }

  handlePlacePlayValueChanged(changeEvent) {
    this.props.interview.fourteenthFields.placeplay = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-fourteenth-musician-page' },
      React.createElement('h1', null, 'Репертуар'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/fourth_img.jpg',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Что вы играете?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'whatplay',
          onChange: this.handleWhatPlayValueChanged,
          defaultValue: checkPoints[currentIndex].whatplay,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'По какому принципу сформирован Ваш репертуар?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', {
          id: 'whythisplay',
          onChange: this.handleWhyThisPlayValueChanged,
          defaultValue: checkPoints[currentIndex].whythisplay,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Зависит ли репертуар от места, в котором Вы играете?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', {
          id: 'placeplay',
          onChange: this.handlePlacePlayValueChanged,
          defaultValue: checkPoints[currentIndex].placeplay,
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

export default connect(mapStateToProps, mapDispatchToProps)(FourteenthMusicianPage);
