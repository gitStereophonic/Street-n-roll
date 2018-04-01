import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class TwentyFirstMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      agreement: false,
    };

    this.checkRequired();
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleThanksValueChanged = this.handleThanksValueChanged.bind(this);
    this.handleHelpValueChanged = this.handleHelpValueChanged.bind(this);
    this.handleAgreementOptionChanged = this.handleAgreementOptionChanged.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    console.log(this.state.agreement);
    if (this.props.interview.currentIndex !== 21) return;
    const green = this.state.agreement;

    const btn = $('#finish-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleThanksValueChanged(changeEvent) {
    this.props.interview.twentyFirstFields.thanks = changeEvent.target.value;
    this.checkRequired();
  }

  handleHelpValueChanged(changeEvent) {
    this.props.interview.twentyFirstFields.help = changeEvent.target.value;
    this.checkRequired();
  }

  handleAgreementOptionChanged(changeEvent) {
    this.state.agreement = changeEvent.target.checked;
    this.checkRequired();
  }

  handleFinish() {
    this.props.actions.finishInterview();
    this.props.actions.sendInterviewData(this.props.interview.checkPoints);
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-twenty-first-musician-page' },
      React.createElement('h1', null, 'Г-СПОДИ Б-ЖЕ ВЫ ДОШЛИ ДО КОНЦА БРАВО Я ВАС ЛЮБЛЮ'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement(
            'h3',
            null,
            'Если Вы музыкант и хотите, чтобы я Вас отблагодарила*, можете сообщить когда и где Вас найти :) Если Вы слушатель и заполнили этот опрос, +over 9000 Вам в карму и низкий поклон от меня лично'
          )
        ),
        React.createElement('p', null, '*Если Вы живете в Москве'),
        React.createElement('textarea', {
          id: 'thanks',
          onChange: this.handleThanksValueChanged,
          defaultValue: checkPoints[currentIndex].thanks,
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
          defaultValue: checkPoints[currentIndex].help,
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
        React.createElement('label', { htmlFor: 'agreement' }, 'Бла бла я готов продать душу дьяволу')
      ),
      React.createElement(
        'button',
        { id: 'finish-btn', className: 'btn-disable', onClick: this.handleFinish },
        'Завершить и отправить'
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

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFirstMusicianPage);
