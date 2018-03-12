import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class SeventeenthMusicianPage extends Component {
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

    this.checkRequired = this.checkRequired.bind(this);
    this.handleCelebrationsValueChanged = this.handleCelebrationsValueChanged.bind(this);
    this.handleHowCelebValueChanged = this.handleHowCelebValueChanged.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 17) return;
    let green = this.props.interview.seventeenthFields.celebrations !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleCelebrationsValueChanged(changeEvent) {
    this.props.interview.seventeenthFields.celebrations = changeEvent.target.value;
    this.checkRequired();
  }

  handleHowCelebValueChanged(changeEvent) {
    this.props.interview.seventeenthFields.howceleb = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-seventeenth-musician-page' },
      React.createElement('h1', null, 'Праздники'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у уличных музыкантов "свои" праздники?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Например, дни памяти или солидарности'),
        React.createElement('input', { id: 'celebrations', onChange: this.handleCelebrationsValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как их отмечают?')),
        React.createElement('textarea', { id: 'howceleb', onChange: this.handleHowCelebValueChanged })
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

export default connect(mapStateToProps, mapDispatchToProps)(SeventeenthMusicianPage);
