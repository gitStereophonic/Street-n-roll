import React, { PureComponent } from 'react';

export default class PageNotFound extends PureComponent {
  render() {
    return React.createElement(
      'div',
      {
        className: 'common-page-not-found',
        height: '100%',
      },
      React.createElement('img', {
        src: '../../images/not_found.png',
        alt: 'Page not found'
      }),
      React.createElement('p', null, 'Страница не найдена')
    );
  }
}
