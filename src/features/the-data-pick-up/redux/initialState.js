import React from 'react';
import { StatByUsers } from './../';

const initialState = {
  components: {
    users: React.createElement('div', { className: 'usersStat' }, React.createElement(StatByUsers)),
    sum: React.createElement('div', { className: 'summaryStat' }, React.createElement('h1', null, 'ALL BTCHS!')),
  },
  currentComponent: React.createElement(
    'div',
    { className: 'usersStat' },
    React.createElement(StatByUsers)
  ),
  startData: [],

  getDataPending: false,
  getDataError: null,
};

export default initialState;
