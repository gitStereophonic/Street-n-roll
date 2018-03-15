import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class FifthListenerPage extends Component {
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

    this.handleSignValueChanged = this.handleSignValueChanged.bind(this);
    this.handleTraditionsValueChanged = this.handleTraditionsValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 5) return;
    let green = this.props.interview.fifthFields.sign !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleSignValueChanged(changeEvent) {
    this.props.interview.fifthFields.sign = changeEvent.target.value;
    this.checkRequired();
  }

  handleTraditionsValueChanged(changeEvent) {
    this.props.interview.fifthFields.traditions = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-fifth-listener-page' },
      React.createElement('h1', null, 'Традиции'),
      React.createElement('img', { className: 'page-head-img', src: '../../images/fifth_img.jpg', alt: 'page image' }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли у Вас приметы и поверья, связанные с уличными музыкантами?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('p', null, 'Например, "встретить менестреля - к удаче"'),
        React.createElement('textarea', {
          id: 'sign',
          onChange: this.handleSignValueChanged,
          defaultValue: checkPoints[currentIndex].sign,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Известны ли Вам обычаи, распространенные среди музыкантов?')
        ),
        React.createElement(
          'p',
          null,
          'Как они приходят на место; как уходят; общаются с прохожими; принимают деньги; где собираются и пр. '
        ),
        React.createElement('textarea', {
          id: 'traditions',
          onChange: this.handleTraditionsValueChanged,
          defaultValue: checkPoints[currentIndex].traditions,
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

export default connect(mapStateToProps, mapDispatchToProps)(FifthListenerPage);
