import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

export class AboutUsPage extends Component {
  static propTypes = {
    // aboutUs: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'about-us-about-us-page' },
      React.createElement('h1', null, 'Авторы: '),
      React.createElement('h3', null, '@CapralPikaChu - Kazimirskaya Olga'),
      React.createElement('h3', null, '@gitStereophonic - Chinkov Sergey'),
      React.createElement(
        'div',
        { className: 'policys' },
        React.createElement(
          'p',
          null,
          'Вы можете ознакомится с нашей ',
          React.createElement(
            Link,
            { to: '/about-us/personal-data-processing-policy' },
            'политикой обработки персональных данных'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'feedback-status' },
        React.createElement(
          'p',
          null,
          'Так же Вы можете оставить свой ',
          React.createElement(Link, { to: '/about-us/feedback' }, 'отзыв'),
          ' или узнать ',
          React.createElement(Link, { to: '/about-us/project-status' }, 'информацию о нашем проекте')
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPage);
