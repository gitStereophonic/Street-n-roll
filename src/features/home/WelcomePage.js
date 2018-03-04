import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RedditList } from './';
import { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList } from './redux/actions';

export class WelcomePage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList } = this.props.actions;
    return React.createElement(
      'div',
      {
        className: 'home-welcome-page',
      },
      React.createElement('p', null, 'Добро пожаловать. Опросник здесь! Опросник для каждого!')
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
