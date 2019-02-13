import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class InterviewPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static nextStatus(g, ms) {
    const btn = $('.next-btn').last();
    if (btn.length === 0) {
      setTimeout(() => {
        this.nextStatus(g);
      }, ms);
    } else if (g) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  render() {
    const { currentIndex, pageContent, lastPage } = this.props.interview;
    const { prevPage, nextPage } = this.props.actions;

    return React.createElement(
      'div',
      {
        className: 'interview-interview-page',
      },
      React.createElement(
        'p',
        {
          className: 'star-must',
          style: { visibility: currentIndex > 0 && currentIndex < lastPage ? 'visible' : 'hidden' },
        },
        '* - Обязательные поля'
      ),
      pageContent,
      React.createElement(
        'button',
        {
          className: 'prev-btn',
          style: { visibility: currentIndex > 0 && currentIndex <= lastPage ? 'visible' : 'hidden' },
          onClick: prevPage,
        },
        'Назад'
      ),
      React.createElement(
        'button',
        {
          className: 'next-btn btn-disable',
          style: { visibility: currentIndex > 0 && currentIndex < lastPage ? 'visible' : 'hidden' },
          onClick: nextPage,
        },
        'Далее'
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

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPage);
