import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleNav from '../common/SimpleNav';
import routeConfig from '../../common/routeConfig';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  render() {
    return React.createElement(
      'div',
      {
        className: 'home-app',
      },
      React.createElement(
        'div',
        {
          className: 'sidebar',
        },
        React.createElement(SimpleNav, {
          routes: routeConfig,
        }),
        React.createElement(
          'p',
          {
            className: 'memo',
          },
          'Разработано на основании курсовой работы студентки 1-го курса факультета филологии НИУ-ВШЭ, Казимирской Ольги,' +
            'для сбора и дальнейшей обработки статистических данных'
        )
      ),
      React.createElement(
        'div',
        {
          className: 'page-container',
        },
        this.props.children
      )
    );
  }
}
