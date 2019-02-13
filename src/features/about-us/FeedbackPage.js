import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import * as actions from './redux/actions';

export class FeedbackPage extends Component {
  static propTypes = {
    aboutUs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.checkRequired = this.checkRequired.bind(this);
    this.handleThanksValueChanged = this.handleThanksValueChanged.bind(this);
    this.handleHelpValueChanged = this.handleHelpValueChanged.bind(this);
    this.handleAgreementOptionChanged = this.handleAgreementOptionChanged.bind(this);
    this.handleFinish = this.handleFinish.bind(this);

    this.state = {
      agreement: false,
      feedBackPageAfter: React.createElement(
        'div',
        { className: 'about-us-feedback-page' },
        React.createElement('h1', null, 'Спасибо Вам за отзыв!')
      ),
      cntnt: React.createElement(
        'div',
        { className: 'about-us-feedback-page' },
        React.createElement(
          'div',
          { className: 'qstn' },
          React.createElement(
            'span',
            null,
            React.createElement(
              'h3',
              null,
              'Если Вы музыкант и хотите, чтобы я Вас отблагодарила*, можете сообщить когда и где Вас найти'
            )
          ),
          React.createElement('p', null, '*Если Вы живете в Москве'),
          React.createElement('textarea', {
            id: 'thanks',
            onChange: this.handleThanksValueChanged,
            defaultValue: this.props.aboutUs.feedBackPage.thanks,
          })
        ),
        React.createElement(
          'div',
          { className: 'qstn' },
          React.createElement(
            'span',
            null,
            React.createElement(
              'h3',
              null,
              'Еще Вы можете помочь мне улучшить этот адский опросник, если напишете, что Вас особенно раздражало и как можно это исправить'
            )
          ),
          React.createElement('textarea', {
            id: 'help',
            onChange: this.handleHelpValueChanged,
            defaultValue: this.props.aboutUs.feedBackPage.help,
          })
        ),
        React.createElement(
          'div',
          { className: 'radio-group' },
          React.createElement('br'),
          React.createElement('input', {
            type: 'checkbox',
            id: 'agreement',
            name: 'agreement',
            onChange: this.handleAgreementOptionChanged,
            defaultChecked: false,
          }),
          React.createElement(
            'label',
            { htmlFor: 'agreement' },
            'Я принимаю ',
            React.createElement(
              Link,
              { to: '/about-us/personal-data-processing-policy' },
              'соглашение сайта об обработке персональных данных'
            )
          )
        ),
        React.createElement(
          'button',
          { id: 'finish-btn', className: 'btn-disable', onClick: this.handleFinish },
          'Отправить'
        )
      ),
    };

    this.checkRequired();
  }

  checkRequired() {
    const { feedBackPage } = this.props.aboutUs;
    const btn = $('#finish-btn').last();

    const green = (feedBackPage.thanks !== '' || feedBackPage.help !== '') && this.state.agreement;

    if (green) {
      btn.removeClass('btn-disable');
      btn.addClass('btn-enbl');
    } else {
      btn.removeClass('btn-enbl');
      btn.addClass('btn-disable');
    }
  }

  handleThanksValueChanged(changeEvent) {
    this.props.aboutUs.feedBackPage.thanks = changeEvent.target.value;
    this.checkRequired();
  }

  handleHelpValueChanged(changeEvent) {
    this.props.aboutUs.feedBackPage.help = changeEvent.target.value;
    this.checkRequired();
  }

  handleAgreementOptionChanged(changeEvent) {
    this.state.agreement = changeEvent.target.checked;
    this.checkRequired();
  }

  handleFinish() {
    this.checkRequired();
    this.props.actions.sendFeedback(this.props.aboutUs.feedBackPage);
    this.state.cntnt = this.state.feedBackPageAfter;
  }

  render() {
    return this.state.cntnt;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    aboutUs: state.aboutUs,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
