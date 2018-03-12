import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TwentyFirstMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
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
        React.createElement('textarea', { id: 'thanks', onChange: this.handleThanksValueChanged })
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
        React.createElement('textarea', { id: 'help', onChange: this.handleHelpValueChanged })
      ),
      React.createElement('button', { onClick: {} }, 'Завершить и отправить')
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
