import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      React.createElement('h1', null, 'Добро пожаловать!'),
      React.createElement('p', null, 'Этот сайт посвящен уличным музыкантам и их деятельности'),
      React.createElement('p', null, '<Далее идет какая-нибудь аннотация (например из курсача)>'),
      React.createElement(
        'p',
        null,
        'На нашем сайте вы можете пройти ',
        React.createElement(Link, { to: '/interview' }, 'опрос'),
        ' для пополнения нашей статистики'
      ),
      React.createElement(
        'p',
        null,
        'Так же вы можете пройти такой же опрос в формате ',
        React.createElement(
          'a',
          {
            href: 'https://docs.google.com/forms/d/e/1FAIpQLSfgbtU6aw8DegRCym-9qzt9sWGlN0C-wJmzX55ICs8R3yssgw/viewform',
            target: '_blank',
          },
          'Google Forms'
        )
      )
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
