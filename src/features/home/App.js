import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleNav from '../common/SimpleNav';
import connect from '../common/UserFeedBack';
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
          '@CapralPikaChu',
          React.createElement('br'),
          '@gitStereophonic'
        )
      ),
      React.createElement(
        'div',
        {
          className: 'page-container',
        },
        this.props.children,
        React.createElement(connect)
      )
    );
  }
}
