import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class UserFeedBack extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { checkPoints } = this.props.interview;
    const { sendInterviewDataAgain } = this.props.actions;

    return React.createElement(
      'div',
      { className: 'common-user-feed-back' },
      React.createElement(
        'div',
        { className: 'error-feedback hide-object' },
        React.createElement(
          'h3',
          { id: 'feedback-message' },
          'При отправке данных произошла ошибка. \nПовторить отправку?'
        ),
        React.createElement(
          'button',
          {
            id: 'repeat-request',
            onClick: () => {
              $('.common-user-feed-back').removeClass('error-panel');
              $('.common-user-feed-back').removeClass('successfull-panel');
              $('.common-user-feed-back').addClass('error-panel-out');
              sendInterviewDataAgain(checkPoints);
            },
          },
          'Отправить ещё раз'
        )
      ),
      React.createElement(
        'div',
        { className: 'successfull-feedback hide-object' },
        React.createElement(
          'h3',
          { id: 'feedback-message' },
          'Отправка данных прошла успешно! Благодарим за внимание к проекту'
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

export default connect(mapStateToProps, mapDispatchToProps)(UserFeedBack);
