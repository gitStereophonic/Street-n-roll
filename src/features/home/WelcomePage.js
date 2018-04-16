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
      React.createElement('p', null, 'Этот сайт создан для написания курсовой работы об уличных музыкантах.'),
      React.createElement(
        'p',
        null,
        'Мы убеждены, что случайностей не бывает. Если человек однажды решился ',
        'достать инструмент на улице и сыграть, значит, что-то его толкнуло к этому. В один из моментов - а ',
        'быть может, раз и навсегда - это показалось ему важным и стоящим. Однажды достав инструмент, Вы ',
        'стали тем, кто нам нужен.'
      ),
      React.createElement(
        'p',
        null,
        'Мы бы хотели расспросить каждого из вас лично. О том, что толкнуло вас ',
        'к тому чтобы выйти на улицу и показать миру свое искусство. О мельчайших деталях ваших сборов. Кем ',
        'вы себя чувствуете, о чем думаете. Во что верите, на что обращаете внимание и что считаете важным. ',
        'Какие истории рассказываете. К сожалению, это невозможно - поэтому мы создали этот сайт.'
      ),
      React.createElement(
        'p',
        null,
        'Мы не обещаем, что весь собранный материал попадет в работу. Но все, ',
        'что Вы оставите здесь, поможет создать образ целой культуры. Настоящей, живой культуры, рассеянной ',
        'на городских улицах. Именно в этом и состоит цель нашей работы. Помогите написать ее!'
      ),
      React.createElement('p', null, 'P. S. Ещё это сильно облегчит участь одного первокурсника. Спасибо!'),
      React.createElement(
        'p',
        null,
        'На нашем сайте сбор информации проводится в виде ',
        React.createElement(Link, { to: '/interview' }, 'опроса')
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
