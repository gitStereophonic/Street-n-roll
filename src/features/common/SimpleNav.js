/*
 * This is a very simple navigation tree for testing purpose.
 * It groups URLs by features.
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SimpleNav extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  renderLinks(items, basePath) {
    return React.createElement(
      'ul',
      null,
      items.reduce((prev, item) => {
        if (item.autoIndexRoute) return prev;
        let path;
        if (/^\//.test(item.path)) {
          path = item.path;
        } else if (basePath === '/') {
          path = `/${item.path}`;
        } else {
          path = `${basePath}/${item.path}`;
        }
        prev.push(
          React.createElement('li', { key: path }, React.createElement(Link, { to: path }, item.name || item.path))
        );

        if (item.childRoutes && item.childRoutes.length) {
          prev.push(React.createElement('li', { key: `${path}_wrapper` }, this.renderLinks(item.childRoutes, path)));
        }
        return prev;
      }, [])
    );
  }

  render() {
    return React.createElement(
      'div',
      { className: 'common-simple-nav' },
      this.renderLinks(this.props.routes[0].childRoutes, '')
    );
  }
}
