/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';

function renderRouteConfigV3(Container, routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath));
    } else if (item.component) {
      children.push(
        React.createElement(Route, {
          key: newContextPath,
          component: item.component,
          path: newContextPath,
          exact: true,
        })
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch as the default container by default
  if (!Container) return React.createElement(Switch, null, children);

  return React.createElement(Container, { key: contextPath }, React.createElement(Switch, null, children));
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    const children = renderRouteConfigV3(null, this.props.routeConfig, '/');
    return React.createElement(
      Provider,
      { store: this.props.store },
      React.createElement(ConnectedRouter, { history: history }, children)
    );
  }
}
