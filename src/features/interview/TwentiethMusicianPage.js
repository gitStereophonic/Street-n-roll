import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class TwentiethMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.checkRequired();
    window.scrollTo(0, 0);

    this.handleIdentityValueChanged = this.handleIdentityValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 20) return;
    let green = this.props.interview.twentiethFields.identity !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleIdentityValueChanged(changeEvent) {
    this.props.interview.twentiethFields.identity = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-twentieth-musician-page' },
      React.createElement('h1', null, 'Идентичность'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как по Вашему, отличаются ли музыканты Вашего города от всех остальных?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Если да, то чем?'),
        React.createElement('textarea', { id: 'identity', onChange: this.handleIdentityValueChanged })
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

export default connect(mapStateToProps, mapDispatchToProps)(TwentiethMusicianPage);
