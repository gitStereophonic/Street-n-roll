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
    const { requestStatus, requestMessage, checkPoints } = this.props.interview;
    const { sendInterviewDataAgain } = this.props.actions;

    return React.createElement(
      'div',
      { className: 'common-user-feed-back' },
      React.createElement('h3', { id: 'feedback-message' }, requestMessage),
      React.createElement(
        'button',
        {
          id: 'repeat-request',
          style: { visibility: requestStatus === 0 ? 'hidden' : 'visible' },
          onClick: () => {
            $('.common-user-feed-back').removeClass('error-panel');
            $('.common-user-feed-back').removeClass('successfull-panel');
            $('.common-user-feed-back').addClass('error-panel-out');
            sendInterviewDataAgain(checkPoints);
          },
        },
        'Отправить ещё раз'
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
