import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

export class FeedbackPage extends Component {
  static propTypes = {
    // aboutUs: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
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
            'Если Вы музыкант и хотите, чтобы я Вас отблагодарила*, можете сообщить когда и где Вас найти :) Если Вы слушатель и заполнили этот опрос, +over 9000 Вам в карму и низкий поклон от меня лично'
          )
        ),
        React.createElement('p', null, '*Если Вы живете в Москве'),
        React.createElement('textarea', {
          id: 'thanks',
          onChange: this.handleThanksValueChanged,
          // defaultValue: checkPoints[currentIndex].thanks,
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
          // defaultValue: checkPoints[currentIndex].help,
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
        'Завершить и отправить'
      )
    );
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
