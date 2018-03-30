import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class WelcomePage extends Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'home-welcome-page',
      },
      React.createElement('h1', null, 'Добро пожаловать!'),
      React.createElement('p', null, 'Этот сайт посвящен уличным музыкантам и их деятельности'),
      React.createElement('p', null, 'Вместо аннотации пока что тестовые данные'),
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
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
